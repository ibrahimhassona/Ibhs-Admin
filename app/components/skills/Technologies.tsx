"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckIcon, PencilIcon, Trash2Icon, Upload } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTech } from "@/app/hooks/useTech";
import { toast } from "sonner";
import supabase from "@/lib/supabase";
import { DeleteConfirmation } from "../DeleteConfirmation";
import { FaSpinner } from "react-icons/fa";
import { TbCancel } from "react-icons/tb";

interface Tech {
  title: string;
  img: string;
}

const Technologies = () => {
  const t = useTranslations("Skills");
  const locale = useLocale();

  // State for technologies
  const [technologies, setTechnologies] = useState<Tech[]>([]);
  const [newTech, setNewTech] = useState<Tech>({ title: "", img: "" });
  const [editTech, setEditTech] = useState<Tech | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track the index of the item being edited
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch tech data
  const { tech, error, isLoading, mutate } = useTech(locale);

  useEffect(() => {
    if (tech?.skills) {
      setTechnologies(tech.skills);
    }
  }, [tech]);

  // Function to check if file exists in storage
  const checkFileExists = async (fileName: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.storage
        .from("tech")
        .list("", { limit: 100 });

      if (error) {
        console.error("Error checking file existence:", error);
        return false;
      }

      return data.some((file) => file.name === fileName);
    } catch (error) {
      console.error("Error in checkFileExists:", error);
      return false;
    }
  };

  // Function to delete old image from storage
  const deleteOldImage = async (fileName: string) => {
    try {
      const { error } = await supabase.storage.from("tech").remove([fileName]);
      if (error) {
        console.error("Error deleting old image:", error);
      }
    } catch (error) {
      console.error("Error in deleteOldImage:", error);
    }
  };

  // Function to upload image to Supabase storage
  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setIsUploading(true);
      const fileName = file.name;

      // Check if file with same name already exists
      const exists = await checkFileExists(fileName);

      if (exists) {
        const { data: urlData } = await supabase.storage
          .from("tech")
          .getPublicUrl(fileName);
        setIsUploading(false);
        return urlData.publicUrl;
      }

      const { error } = await supabase.storage
        .from("tech")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Upload error:", error);
        toast.error(t("uploadImageFailed"));
        setIsUploading(false);
        return null;
      }

      const { data: urlData } = await supabase.storage
        .from("tech")
        .getPublicUrl(fileName);

      setIsUploading(false);
      return urlData.publicUrl;
    } catch (error) {
      console.error("Error in uploadImage:", error);
      setIsUploading(false);
      return null;
    }
  };

  // Function to add new technology
  const handleAddTech = async () => {
    if (!newTech.title || !selectedFile) {
      toast.error(t("completeData"));
      return;
    }

    try {
      setIsSubmitting(true);

      // Upload image and get URL
      const imageUrl = await uploadImage(selectedFile);
      if (!imageUrl) {
        toast.error(t("uploadImageFailed"));
        setIsSubmitting(false);
        return;
      }

      // Create new tech object with image URL
      const techToAdd: Tech = {
        title: newTech.title,
        img: imageUrl,
      };

      // Fetch current data for the current locale only
      const { data: currentData, error: fetchError } = await supabase
        .from("skills")
        .select("dataTech")
        .eq("language", locale)
        .single();

      if (fetchError || !currentData) {
        console.error("Error fetching current skills:", fetchError);
        toast.error(t("fetchDataFailed"));
        setIsSubmitting(false);
        return;
      }

      // Prepare the updated skills array
      const updatedSkills = [...(currentData.dataTech || []), techToAdd];

      // Update both rows (ar and en) with the same title and image
      const languages = ["ar", "en"];
      for (const lang of languages) {
        const { error } = await supabase
          .from("skills")
          .update({ dataTech: updatedSkills })
          .eq("language", lang);

        if (error) {
          console.error(`Error updating skills for ${lang}:`, error);
          toast.error(t("updateTechFailed", { lang }));
          setIsSubmitting(false);
          return;
        }
      }

      toast.success(t("techAddedSuccessfully"));

      // Reset form
      setNewTech({ title: "", img: "" });
      setSelectedFile(null);

      // Refresh data
      mutate();

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error in handleAddTech:", error);
      toast.error(t("errorAddingTech"));
      setIsSubmitting(false);
    }
  };

  // Function to update technology
  const handleUpdateTech = async (originalTitle: string) => {
    if (!editTech || !editTech.title) {
      toast.error(t("incompleteTechData"));
      return;
    }

    try {
      setIsSubmitting(true);

      let imageUrl = editTech.img;
      let oldImageName: string | null = null;

      // If new image selected for editing
      if (selectedFile) {
        const newImageUrl = await uploadImage(selectedFile);
        if (newImageUrl) {
          imageUrl = newImageUrl;
          const urlParts = editTech.img.split("/");
          oldImageName = urlParts[urlParts.length - 1];
        } else {
          toast.error(t("updateImageFailed"));
          setIsSubmitting(false);
          return;
        }
      }

      // Create updated tech object
      const updatedTech: Tech = {
        title: editTech.title,
        img: imageUrl,
      };

      // Update in technologies array
      const updatedTechs = technologies.map((t: Tech) =>
        t.title === originalTitle ? updatedTech : t
      );

      // Update in Supabase for both locales (ar and en)
      const languages = ["ar", "en"];
      for (const lang of languages) {
        const { error } = await supabase
          .from("skills")
          .update({ dataTech: updatedTechs })
          .eq("language", lang);

        if (error) {
          console.error(`Error updating skill for ${lang}:`, error);
          toast.error(t("updateTechFailed", { lang }));
          setIsSubmitting(false);
          return;
        }
      }

      // Delete old image if a new one was uploaded
      if (oldImageName) {
        await deleteOldImage(oldImageName);
      }

      toast.success(t("techUpdatedSuccessfully"));
      // Reset edit state
      setEditTech(null);
      setEditIndex(null);
      setSelectedFile(null);

      // Refresh data
      mutate();

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error in handleUpdateTech:", error);
      toast.error(t("errorUpdatingTech"));
      setIsSubmitting(false);
    }
  };

  // Function to delete technology
  const handleDeleteTech = async (techTitle: string) => {
    try {
      setIsSubmitting(true);

      // Find the tech to get its image URL
      const techToDelete = technologies.find(
        (t: Tech) => t.title === techTitle
      );
      const imageName = techToDelete?.img.split("/").pop();

      // Filter out the tech to delete
      const updatedTechs = technologies.filter(
        (t: Tech) => t.title !== techTitle
      );

      // Update in Supabase for both locales (ar and en)
      const languages = ["ar", "en"];
      for (const lang of languages) {
        const { error } = await supabase
          .from("skills")
          .update({ dataTech: updatedTechs })
          .eq("language", lang);

        if (error) {
          console.error(`Error deleting skill for ${lang}:`, error);
          toast.error(t("deleteTechFailed", { lang }));
          setIsSubmitting(false);
          return;
        }
      }

      // Delete the image from storage
      if (imageName) {
        await deleteOldImage(imageName);
      }

      toast.success(t("techDeletedSuccessfully"));

      // Refresh data
      mutate();

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error in handleDeleteTech:", error);
      toast.error(t("errorDeletingTech"));
      setIsSubmitting(false);
    }
  };

  // Handle image upload for preview
  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    isNew: boolean = false
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error(t("selectValidImage"));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t("imageSizeTooLarge"));
        return;
      }
      setSelectedFile(file);

      const imageUrl = URL.createObjectURL(file);

      if (isNew) {
        setNewTech((prev) => ({ ...prev, img: imageUrl }));
      } else if (editTech) {
        setEditTech((prev) => (prev ? { ...prev, img: imageUrl } : null));
      }

      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center flex items-center justify-center h-[400px]">
        <p>
          <FaSpinner className=" animate-spin text-primary" size={40} />
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        <p>{t("errorLoading")}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2">
      <div className="p-2 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
        {technologies?.map((tech: Tech, index: number) => (
          <div
            key={index}
            className="shadow-md p-4 rounded-md flex justify-between items-center gap-2 border-[1px] borderColor"
          >
            <div className="flex items-center justify-center gap-2">
              <Image
                src={tech.img}
                alt={tech.title}
                width={60}
                height={60}
                className="rounded-full h-12 w-12 object-contain "
              />
            </div>
            {editIndex === index ? (
              <input
                type="text"
                value={editTech?.title || ""}
                onChange={(e) =>
                  setEditTech({ ...editTech!, title: e.target.value })
                }
                className="py-2 px-2 border-[1px] borderColor outline-none text-sm rounded-md text-start w-full cust-trans animate-fade-up"
              />
            ) : (
              <p className="py-1 px-2 text-sm border border-transparent w-full cust-trans animate-fade-down">
                {tech.title}
              </p>
            )}
            <div className="flex gap-2 w-fit">
              {editIndex === index ? (
                <button
                  aria-label="done"
                  name="done"
                  className="p-2 text-white cust-trans bg-primary-dark rounded-md hover:bg-primary disabled:opacity-50"
                  onClick={() => handleUpdateTech(tech.title)}
                  disabled={isSubmitting}
                >
                  <CheckIcon size={16} />
                </button>
              ) : (
                <button
                  aria-label="edit"
                  name="edit"
                  className="p-2 text-white cust-trans bg-yellow-600 rounded-md hover:bg-yellow-500 disabled:opacity-50"
                  onClick={() => {
                    setEditTech(tech);
                    setEditIndex(index);
                  }}
                  disabled={isSubmitting}
                >
                  <PencilIcon size={16} />
                </button>
              )}

              {editIndex === index ? (
                <button
                  aria-label="cancle"
                  name="cancle"
                  className="p-2 text-white cust-trans bg-red-600 rounded-md hover:bg-red-500 disabled:opacity-50"
                  onClick={() => {
                    setEditIndex(null);
                  }}
                  disabled={isSubmitting}
                >
                  <TbCancel size={16} />
                </button>
              ) : (
                <DeleteConfirmation
                  style="p-1 text-white cust-trans bg-red-600 rounded-md hover:bg-red-500 disabled:opacity-50"
                  onConfirm={() => handleDeleteTech(tech.title)}
                  title={tech.title}
                >
                  <Trash2Icon size={16} />
                </DeleteConfirmation>
              )}
            </div>
          </div>
        ))}
      </div>
      {!editTech && (
        <div className="mt-6 p-4 rounded-lg border-[1px] borderColor max-w-[500px] mx-auto">
          <h3 className="mb-2 font-medium">{t("addSkill")}</h3>
          <div className="flex items-center gap-2 p-2 rounded-md">
            <input
              type="text"
              placeholder={t("techName")}
              value={newTech.title}
              onChange={(e) =>
                setNewTech({ ...newTech, title: e.target.value })
              }
              className="p-2 border-[1px] borderColor text-sm rounded-md w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isSubmitting}
            />
            <label
              className={`cursor-pointer p-2 ${
                isSubmitting
                  ? "bg-gray-400"
                  : "bg-primary-dark hover:bg-primary"
              } rounded-md transition flex items-center justify-center`}
            >
              <Upload className="w-5 h-5 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, true)}
                className="hidden"
                disabled={isSubmitting}
              />
            </label>
          </div>
          {newTech.img && (
            <div className="mt-2 flex justify-center">
              <Image
                src={newTech.img}
                alt="Preview"
                width={60}
                height={60}
                className="rounded h-16 w-16 object-contain border borderColor"
              />
            </div>
          )}
          <button
            aria-label={t("addBtn")}
            name={t("addBtn")}
            onClick={handleAddTech}
            disabled={
              isSubmitting || isUploading || !newTech.title || !newTech.img
            }
            className={`${
              isSubmitting || isUploading || !newTech.title || !newTech.img
                ? " opacity-50 cursor-not-allowed"
                : ""
            } bg-primary-dark hover:bg-primary cust-trans w-fit text-white py-2 px-4 rounded mt-4 mx-auto flex justify-center items-center gap-2 text-sm`}
          >
            {isSubmitting || isUploading ? t("adding") : t("addBtn")}
            {isSubmitting || isUploading ? (
              <FaSpinner className="animate-spin" />
            ) : null}
          </button>
        </div>
      )}
      {editTech && (
        <div className="mt-4 p-4 border-[1px] borderColor rounded-lg max-w-[500px] mx-auto">
          <h4 className="text-sm font-medium mb-2">{t("uploadNewImage")}</h4>
          <div className="flex items-center justify-between gap-2">
            <Image
              src={editTech.img}
              alt={editTech.title}
              width={60}
              height={60}
              className="rounded-full h-12 w-12 object-contain border borderColor"
            />
            <label
              className={`cursor-pointer p-2 ${
                isSubmitting
                  ? "bg-gray-400"
                  : "bg-primary-dark hover:bg-primary"
              } rounded-md transition flex items-center justify-center`}
            >
              <Upload className="w-5 h-5 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e)}
                className="hidden"
                disabled={isSubmitting}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Technologies;