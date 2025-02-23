import { useTranslations } from "next-intl";
import React, { useState, useCallback, useEffect } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Image from "next/image";

const CoverAndImage = () => {
  const t = useTranslations("Profile");
  return (
    <div className="flex items-center gap-6 max-lg:flex-col">
      {/* ------ Personal Image -------- */}
      <MemoizedImageComponent title={t("changePersonalPhoto")} />
      {/* ------ Cover -------- */}
      <MemoizedImageComponent title={t("changePersonalCover")} />
    </div>
  );
};

export default CoverAndImage;
const ImageComponent: React.FC<{ title: string }> = ({ title }) => {
  const [image, setImage] = useState<string | null>(null);
  // إنشاء معرف فريد لكل مكون
  const inputId = `imageUpload-${title.replace(/\s+/g, '-')}`;

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(event.target.files)
    if (file) {
      if (image) URL.revokeObjectURL(image);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }, [image]);

  return (
    <div className="flex flex-col gap-2 items-center">
      <h2 className="mx-2">{title}</h2>
      <div className="relative shadow-md bg-gray-200 rounded-md h-60 w-[400px] max-md:w-[250px] max-md:h-40 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt="Uploaded Image"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-black/20">
            <MdOutlineAddPhotoAlternate size={40} className="text-white" />
          </div>
        )}

        <label
          htmlFor={inputId} // استخدام المعرف الفريد هنا
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 cust-trans cursor-pointer"
        >
          <input
            id={inputId} // استخدام نفس المعرف الفريد هنا
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <MdOutlineAddPhotoAlternate size={40} className="text-white" />
        </label>
      </div>
    </div>
  );
};

const MemoizedImageComponent = React.memo(ImageComponent);