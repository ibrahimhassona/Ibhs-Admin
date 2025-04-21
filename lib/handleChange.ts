import { ChangeEvent } from "react";
import { Project } from "./types";
import { AppDispatch } from "./store"; 
import { setCurrentProject } from "@/features/projects/projectsSlice";

export const handleChange =
  (dispatch: AppDispatch, formData: Project | null) =>
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // إذا كان formData فارغًا (null)، قم بإنشاء كائن فارغ بالهيكل الأساسي
    const currentData = formData || {
      image: "",
      title: "",
      slug: "",
      status: "",
      technologies: [],
      description: "",
      date: "",
      isFeature: "",
      video: "",
      links: {
        live: "",
        repo: ""
      }
    };

    const { name, value } = e.target;
    let updatedData: Partial<Project> = {};

    if (
      name === "image" &&
      e.target instanceof HTMLInputElement &&
      e.target.files?.[0]
    ) {
      const file = e.target.files[0];
      // تحويل الملف إلى URL مؤقت لأن نوع image هو string
      const imageUrl = URL.createObjectURL(file);
      updatedData = {
        ...updatedData,
        image: imageUrl
      };
      console.log('Selected File URL:', imageUrl);
    } else if (name === "repo" || name === "live") {
      // التعامل مع الروابط
      updatedData = {
        ...updatedData,
        links: {
          ...currentData.links,
          [name]: value
        }
      };
    } else if (name === "status") {
      // تعيين قيمة status
      updatedData = {
        ...updatedData,
        status: value
      };
    } else if (name === "isFeature") {
      // تعيين قيمة isFeature
      updatedData = {
        ...updatedData,
        isFeature: value
      };
    } else if (name === "technologies") {
      // تقسيم النص إلى مصفوفة
      const techArray = value.split(",").map((tech) => tech.trim());
      updatedData = {
        ...updatedData,
        technologies: techArray
      };
    } else {
      // التعامل مع باقي الحقول
      updatedData = {
        ...updatedData,
        [name]: value
      };
    }

    // إرسال الحالة المحدثة عبر dispatch
    dispatch(setCurrentProject({ ...currentData, ...updatedData }));
  };