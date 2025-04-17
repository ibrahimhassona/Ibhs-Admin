import React, { useEffect, useState } from "react";
import { Project } from "./projects/ProjectsSection";
import { useLocale, useTranslations } from "next-intl"; // Import the translation hook
import { addNewProject } from "@/lib/CRUD";
import ReusableSelect from "./ReusableSelect";
import { TbLabelImportantFilled } from "react-icons/tb";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { handleChange as handleInputChange } from "@/lib/handleChange";

const AddAndEditDialog = ({
  isOpen,
  setIsOpen,
  isEditMode = false,
  currentProject = null,
  onSubmit,
  children,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isEditMode?: boolean;
  currentProject?: Project | null;
  onSubmit: (data: Project) => void;
  children: React.ReactNode;
}) => {


  const t = useTranslations("projects"); // Use the translation hook
  const locale = useLocale();
  // ------------ Main State to collect The project -------
  const [formData, setFormData] = useState<Project>({
    image: "",
    title: "",
    slug: "",
    status: "", // changed to boolean
    technologies: [],
    description: "",
    date: "",
    isFeature: "false",
    video: "",
    links: {
      live: "",
      repo: "",
    },
  });



const handleAddNewProject = async () => {
  await addNewProject(formData, locale, t);
};


  useEffect(() => {
    if (isEditMode && currentProject) {
      // Populate with current project data when in edit mode
      setFormData({
        image: currentProject.image || "",
        title: currentProject.title || "",
        slug: currentProject.slug || "",
        status: currentProject.status || "",
        technologies:currentProject.technologies||[], 
        description: currentProject.description || "",
        date: currentProject.date || "",
        isFeature: currentProject.isFeature ? "true" : "false", // Convert boolean to string
        video: currentProject.video || "",
        links: {
          live: currentProject.links?.live || "",
          repo: currentProject.links?.repo || "",
        },
      });
    } else {
      // Clear form if in add mode
      setFormData({
        image: "",
        title: "",
        slug: "",
        status: "",
        technologies: [],
        description: "",
        date: "",
        isFeature: "false",
        video: "",
        links: {
          live: "",
          repo: "",
        },
      });
    }
  }, [isEditMode, currentProject]);

  // Handle input changes
const handleChange=handleInputChange<Project>(setFormData)
// ---- select the type of function ----
  const typeFunction = async () => {
    if (isEditMode) {
      if (formData) {
        onSubmit(formData); // sent to the parent component
        console.log("formData sent to bottom card ");
      }
    } else {
      await handleAddNewProject();
      console.log("New Project:", formData);
    }
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
              className="text-primary text-[10px]   mb-1 flex items-center gap-1"
            >
              <TbLabelImportantFilled
                size={12}
                className={`${locale == "ar" ? "rotate-180" : ""}`}
              />{" "}
              {t("image")}
            </label>
            <Input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleChange}
              aria-label={t("image")}
            />
          </div>

          <div>
            <label
              htmlFor="title"
              className="text-primary text-[10px]  mb-1 flex items-center gap-1"
            >
              <TbLabelImportantFilled
                size={12}
                className={`${locale == "ar" ? "rotate-180" : ""}`}
              />{" "}
              {t("title")}
            </label>
            <Input
              placeholder={t("title")}
              value={formData.title}
              name="title"
              id="title"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="text-primary text-[10px]  mb-1 flex items-center gap-1"
            >
              <TbLabelImportantFilled
                size={12}
                className={`${locale == "ar" ? "rotate-180" : ""}`}
              />{" "}
              {t("slug")}
            </label>
            <Input
              placeholder={t("slug")}
              value={formData.slug}
              name="slug"
              id="slug"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label
                htmlFor="isFeature"
                className="text-primary text-[10px]   mb-1 flex items-center gap-1"
              >
                <TbLabelImportantFilled
                  size={12}
                  className={`${locale == "ar" ? "rotate-180" : ""}`}
                />
                {""}
                {t("isfeature")}
              </label>
              <ReusableSelect
                name="isFeature"
                value={formData.isFeature}
                onChange={(value) =>
                  setFormData({ ...formData, isFeature: value })
                }
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
                className="text-primary text-[10px]   mb-1 flex items-center gap-1"
              >
                <TbLabelImportantFilled
                  size={12}
                  className={`${locale == "ar" ? "rotate-180" : ""}`}
                />{" "}
                {t("status")}
              </label>
              <ReusableSelect
                name="status"
                value={formData.status}
                onChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
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
              className="text-primary text-[10px]   mb-1 flex items-center gap-1"
            >
              <TbLabelImportantFilled
                size={12}
                className={`${locale == "ar" ? "rotate-180" : ""}`}
              />{" "}
              {t("technologies")}
            </label>
            <Textarea
              placeholder={t("technologies")}
              name="technologies"
              id="technologies"
              value={formData.technologies}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="text-primary text-[10px]   mb-1 flex items-center gap-1"
            >
              <TbLabelImportantFilled
                size={12}
                className={`${locale == "ar" ? "rotate-180" : ""}`}
              />{" "}
              {t("date")}
            </label>
            <Input
              placeholder={t("date")}
              value={formData.date}
              name="date"
              id="date"
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="text-primary text-[10px]   mb-1 flex items-center gap-1"
            >
              <TbLabelImportantFilled
                size={12}
                className={`${locale == "ar" ? "rotate-180" : ""}`}
              />{" "}
              {t("description")}
            </label>
            <Textarea
              placeholder={t("description")}
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="repo"
              className="text-primary text-[10px]   mb-1 flex items-center gap-1"
            >
              <TbLabelImportantFilled
                size={12}
                className={`${locale == "ar" ? "rotate-180" : ""}`}
              />{" "}
              {t("githubLink")}
            </label>
            <Input
              placeholder={t("githubLink")}
              name="repo"
              id="repo"
              value={formData.links.repo}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="live"
              className="text-primary text-[10px]   mb-1 flex items-center gap-1"
            >
              <TbLabelImportantFilled
                size={12}
                className={`${locale == "ar" ? "rotate-180" : ""}`}
              />{" "}
              {t("liveLink")}
            </label>
            <Input
              placeholder={t("liveLink")}
              value={formData?.links.live}
              name="live"
              id="live"
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="video"
              className="text-primary text-[10px]   mb-1 flex items-center gap-1"
            >
              <TbLabelImportantFilled
                size={12}
                className={`${locale == "ar" ? "rotate-180" : ""}`}
              />{" "}
              {t("videoLink")}
            </label>
            <Input
              placeholder={t("videoLink")}
              name="video"
              id="video"
              value={formData?.video}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button
          onClick={typeFunction}
          className="w-fit mx-auto cust-trans text-white"
        >
          {t("save")}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddAndEditDialog;
