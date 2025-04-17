import React, { useState, useCallback, useEffect } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Image from "next/image";
import supabase from "@/lib/supabase";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import ProgressLoader from "../ui/ProgressLoader";

// -------- Uploading Images Component --------
const ImageComponent: React.FC<{
  title: string;
  url: string;
  field: "image" | "cover";
  locale: string;
}> = ({ title, url, field }) => {
  const [image, setImage] = useState<string | null>(url);
  const [isUploading, setIsUploading] = useState(false);
  const t = useTranslations("Profile");

  const inputId = `imageUpload-${title.replace(/\s+/g, "-")}`;
  useEffect(() => {
    setImage(url);
  }, [url]);
  // -------- Update image URL in `personal_information` table --------
  const updateDatabaseImage = useCallback(
    async (imageUrl: string, field: "cover" | "image") => {
      const { error } = await supabase
        .from("Personal_information")
        .update({ [field]: imageUrl })
        .in("language", ["ar", "en"]);
  
      if (error) {
        console.error("❌ Error updating database:", error.message);
        toast.error(t("databaseUpdateFailed"));
      } else {
        console.log(`✅ ${field} updated successfully for 'ar' and 'en'`);
        toast.success(t("databaseUpdatedSuccessfully"));
      }
    },
    [t] // Dependencies: It only depends on `t`
  );
  


  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
  
      setIsUploading(true);
  
      // Define a unique file path
      const filePath = `${field}/${Date.now()}_${file.name}`;
  
      try {
        // Uploading to Supabase Storage
        const { error } = await supabase.storage
          .from("personal")
          .upload(filePath, file);
  
        if (error) throw error;
  
        // Generate a public URL for the uploaded file
        const { data } = supabase.storage.from("personal").getPublicUrl(filePath);
  
        if (!data?.publicUrl) {
          throw new Error("Failed to retrieve public URL");
        }
  
        setImage(data.publicUrl);
  
        // Update the personal_information table
        await updateDatabaseImage(data.publicUrl, field);
  
        toast.success(`${title} ${t("uploaded")}`);
      } catch (error:unknown) {
        if (error instanceof Error) {
          console.error("❌ Error uploading image:", error.message);
          toast.info(t("uploadFailed"));
        } else {
          console.error("❌ Unknown error:", error);
          toast.error(t("uploadFailed"));
        }
      } finally {
        setIsUploading(false);
      }
    },
    [field, setIsUploading, setImage, updateDatabaseImage, title, t] 
  );
  



  return (
    <div className="flex flex-col gap-2 items-center">
      <h2 className="mx-2">{title}</h2>
      <div className="relative shadow-md bg-gray-200 rounded-md h-60 w-[400px] max-md:w-[250px] max-md:h-40 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt="Uploaded Image"
            width={200}
            height={200}
            priority
            placeholder="blur"
            blurDataURL="data:image/png;base64,..."
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-black/20">
            <MdOutlineAddPhotoAlternate size={40} className="text-white" />
          </div>
        )}

        <label
          htmlFor={inputId}
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 cursor-pointer"
        >
          <input
            id={inputId}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
          {isUploading ? (
           <ProgressLoader size={90} stroke={5} bgOpacity={0.1} speed={4} color="#439400" />

          ) : (
            <MdOutlineAddPhotoAlternate size={40} className="text-white" />
          )}
        </label>
      </div>
    </div>
  );
};

export const MemoizedImageComponent = React.memo(ImageComponent);
