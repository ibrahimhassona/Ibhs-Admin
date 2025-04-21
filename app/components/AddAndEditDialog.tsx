import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { addNewProject } from "@/lib/CRUD";
import ReusableSelect from "./ReusableSelect";
import { TbLabelImportantFilled } from "react-icons/tb";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Project } from "@/lib/types";
import { updateProject, setCurrentProject } from "@/features/projects/projectsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const AddAndEditDialog = ({
  isOpen,
  setIsOpen,
  isEditMode = false,
  children,
  currentRealProject
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isEditMode?: boolean;
  children: React.ReactNode;
  currentRealProject?: Project
}) => {
  const t = useTranslations("projects");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const currentProject = useAppSelector((state) => state.projects.currentProject);

  // Initialize form data when dialog opens or edit mode changes
  useEffect(() => {
    if (isOpen) {
      if (isEditMode && currentRealProject) {
        // When editing, populate form with the real project data
        dispatch(setCurrentProject(currentRealProject));
      } else if (!isEditMode) {
        // When adding new, reset to empty form
        dispatch(setCurrentProject({
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
        }));
      }
    }
  }, [isOpen, isEditMode, currentRealProject, dispatch]);

  const handleAddNewProject = async () => {
    if (currentProject) {
      await addNewProject(currentProject, locale, t);
      setIsOpen(false); // Close dialog after saving
    }
  };

  const handleUpdateProject = async () => {
    if (currentProject) {
      dispatch(updateProject(currentProject));
      // Here you would typically call your API to update the project
      // await updateProjectInDatabase(currentProject);
      setIsOpen(false); // Close dialog after saving
    }
  };

  const handleSave = async () => {
    if (isEditMode) {
      await handleUpdateProject();
    } else {
      await handleAddNewProject();
    }
  };

// إنشاء معالج للتغييرات في حقول النموذج
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  
  // إذا كان currentProject هو null، قم بإنشاء هيكل مشروع فارغ افتراضي
  const safeCurrentProject: Project = currentProject || {
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
  
  // الآن استخدم safeCurrentProject الذي من المؤكد أنه من نوع Project
  if (name === "image" && e.target instanceof HTMLInputElement && e.target.files?.[0]) {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    dispatch(setCurrentProject({ ...safeCurrentProject, image: imageUrl }));
  } 
  // التعامل مع خصائص كائن الروابط
  else if (name === "repo" || name === "live") {
    dispatch(setCurrentProject({
      ...safeCurrentProject,
      links: {
        ...safeCurrentProject.links,
        [name]: value
      }
    }));
  } 
  // التعامل مع مصفوفة التقنيات
  else if (name === "technologies") {
    const techArray = value.split(",").map((tech) => tech.trim());
    dispatch(setCurrentProject({ 
      ...safeCurrentProject, 
      technologies: techArray 
    }));
  } 
  // التعامل مع جميع الحقول القياسية الأخرى
  else {
    dispatch(setCurrentProject({ 
      ...safeCurrentProject, 
      [name]: value 
    }));
  }
};
// معالج مخصص لمدخلات التحديد 
const handleSelectChange = (name: string, value: string) => {
  const safeCurrentProject: Project = currentProject || {
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
  
  dispatch(setCurrentProject({ 
    ...safeCurrentProject, 
    [name]: value 
  }));
};
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          aria-label={t("addNewProject")}
          name="add new project"
          className="bg-primary-dark cust-trans hover:bg-primary text-white px-4 py-2 rounded-md flex items-center justify-between gap-2"
        >
          {children}
        </button>
      </DialogTrigger>
      <DialogContent className="bg-background-light dark:bg-background-dark p-6 rounded-xl overflow-y-auto max-h-[80vh]">
        <DialogTitle>
          <VisuallyHidden>
            {isEditMode ? t("editProject") : t("addNewProject")}
          </VisuallyHidden>
        </DialogTitle>
        <h3 className="font-bold mb-4">
          {isEditMode ? t("editProject") : t("addNewProject")}
        </h3>
        <div className="space-y-3">
          <div>
            <label
              htmlFor="image"
              className="text-primary text-[10px] mb-1 flex items-center gap-1"
            >
              <TbLabelImportantFilled
                size={12}
                className={`${locale === "ar" ? "rotate-180" : ""}`}
              />{" "}
              {t("image")}
            </label>
            <Input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleInputChange}
              aria-label={t("image")}
            />
          </div>

          <div>
            <label
              htmlFor="title"
              className="text-primary text-[10px] mb-1 flex items-center gap-1"
            >
              <TbLabelImportantFilled
                size={12}
                className={`${locale === "ar" ? "rotate-180" : ""}`}
              />{" "}
              {t("title")}
            </label>
            <Input
              placeholder={t("title")}
              value={currentProject?.title || ""}
              name="title"
              id="title"
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <label
              htmlFor="slug"
              className="text-primary text-[10px] mb-1 flex items-center gap-1"
            >
              <TbLabelImportantFilled
                size={12}
                className={`${locale === "ar" ? "rotate-180" : ""}`}
              />{" "}
              {t("slug")}
            </label>
            <Input
              placeholder={t("slug")}
              value={currentProject?.slug || ""}
              name="slug"
              id="slug"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label
                htmlFor="isFeature"
                className="text-primary text-[10px] mb-1 flex items-center gap-1"
              >
                <TbLabelImportantFilled
                  size={12}
                  className={`${locale === "ar" ? "rotate-180" : ""}`}
                />
                {""}
                {t("isfeature")}
              </label>
              <ReusableSelect
                name="isFeature"
                value={currentProject?.isFeature || ""}
                onChange={(value) => handleSelectChange("isFeature", value)}
                options={[
                  { value: "true", label: t("yes") },
                  { value: "false", label: t("no") },
                ]}
                placeholder={t("isfeature")}
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="status"
                className="text-primary text-[10px] mb-1 flex items-center gap-1"
              >
                <TbLabelImportantFilled
                  size={12}
                  className={`${locale === "ar" ? "rotate-180" : ""}`}
                />{" "}
                {t("status")}
              </label>
              <ReusableSelect
                name="status"
                value={currentProject?.status || ""}
                onChange={(value) => handleSelectChange("status", value)}
                options={[
                  { value: "full", label: t("full") },
                  { value: "shared", label: t("shared") },
                ]}
                placeholder={t("select_project_status")}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="technologies"
              className="text-primary text-[10px] mb-1 flex items-center gap-1"
            >
              <TbLabelImportantFilled
                size={12}
                className={`${locale === "ar" ? "rotate-180" : ""}`}
              />{" "}
              {t("technologies")}
            </label>
            <Textarea
              placeholder={t("technologies")}
              name="technologies"
              id="technologies"
              value={currentProject?.technologies?.join(", ") || ""}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="text-primary text-[10px] mb-1 flex items-center gap-1"
            >
              <TbLabelImportantFilled
                size={12}
                className={`${locale === "ar" ? "rotate-180" : ""}`}
              />{" "}
              {t("date")}
            </label>
            <Input
              placeholder={t("date")}
              value={currentProject?.date || ""}
              name="date"
              id="date"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="text-primary text-[10px] mb-1 flex items-center gap-1"
            >
              <TbLabelImportantFilled
                size={12}
                className={`${locale === "ar" ? "rotate-180" : ""}`}
              />{" "}
              {t("description")}
            </label>
            <Textarea
              placeholder={t("description")}
              name="description"
              id="description"
              value={currentProject?.description || ""}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="repo"
              className="text-primary text-[10px] mb-1 flex items-center gap-1"
            >
              <TbLabelImportantFilled
                size={12}
                className={`${locale === "ar" ? "rotate-180" : ""}`}
              />{" "}
              {t("githubLink")}
            </label>
            <Input
              placeholder={t("githubLink")}
              name="repo"
              id="repo"
              value={currentProject?.links?.repo || ""}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="live"
              className="text-primary text-[10px] mb-1 flex items-center gap-1"
            >
              <TbLabelImportantFilled
                size={12}
                className={`${locale === "ar" ? "rotate-180" : ""}`}
              />{" "}
              {t("liveLink")}
            </label>
            <Input
              placeholder={t("liveLink")}
              value={currentProject?.links?.live || ""}
              name="live"
              id="live"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="video"
              className="text-primary text-[10px] mb-1 flex items-center gap-1"
            >
              <TbLabelImportantFilled
                size={12}
                className={`${locale === "ar" ? "rotate-180" : ""}`}
              />{" "}
              {t("videoLink")}
            </label>
            <Input
              placeholder={t("videoLink")}
              name="video"
              id="video"
              value={currentProject?.video || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <Button
          onClick={handleSave}
          className="w-fit mx-auto cust-trans text-white"
        >
          {t("save")}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddAndEditDialog;