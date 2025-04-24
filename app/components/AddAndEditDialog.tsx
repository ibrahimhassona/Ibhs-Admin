import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { TbLabelImportantFilled } from "react-icons/tb";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Project } from "@/lib/types";
import {
  setCurrentProject,
  setProjects,
} from "@/features/projects/projectsSlice";
import { useAppDispatch } from "@/lib/hooks";
import ReusableSelect from "./ReusableSelect";
import { handleRowOperation } from "@/lib/uploadImageToStorage";
import Image from "next/image";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

// Default empty project to prevent null values
const defaultProject: Project = {
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
    repo: "",
  },
};

const AddAndEditDialog = ({
  isOpen,
  setIsOpen,
  isEditMode = false,
  children,
  currentRealProject,
  style,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isEditMode?: boolean;
  children: React.ReactNode;
  currentRealProject?: Project;
  style?: string;
}) => {
  const t = useTranslations("projects");
  const locale = useLocale();
  const dispatch = useAppDispatch();

  // Local state for editing and adding
  const [editProject, setEditProject] = useState<Project>({
    ...defaultProject,
  });
  const [newProject, setNewProject] = useState<Project>({ ...defaultProject });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  // Initialize form data when dialog opens or edit mode changes
  useEffect(() => {
    if (isOpen) {
      if (isEditMode && currentRealProject) {
        setEditProject({
          ...currentRealProject,
          links: {
            live: currentRealProject.links?.live || "",
            repo: currentRealProject.links?.repo || "",
          },
          technologies: currentRealProject.technologies || [],
        });
        setImageFile(null);
      } else {
        setNewProject({ ...defaultProject });
        setImageFile(null);
      }
    }
  }, [isOpen, isEditMode, currentRealProject]);

  // Get current project based on mode
  const currentProject = isEditMode ? editProject : newProject;

  // Handlers for input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const setter = isEditMode ? setEditProject : setNewProject;

    if (
      name === "image" &&
      e.target instanceof HTMLInputElement &&
      e.target.files?.[0]
    ) {
      const file = e.target.files[0];
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setter((prev) => ({ ...prev, image: imageUrl }));
    } else if (name === "repo" || name === "live") {
      setter((prev) => ({
        ...prev,
        links: { ...prev.links, [name]: value },
      }));
    } else if (name === "technologies") {
      const techArray = value.split(",").map((tech) => tech.trim());
      setter((prev) => ({ ...prev, technologies: techArray }));
    } else {
      setter((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    const setter = isEditMode ? setEditProject : setNewProject;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  // Safe getters
  const getProjectValue = (field: keyof Project): string => {
    return (currentProject[field] as string) || "";
  };

  const getLinkValue = (field: keyof typeof currentProject.links): string => {
    return currentProject.links?.[field] || "";
  };

  const getTechnologies = (): string => {
    return currentProject.technologies?.join(", ") || "";
  };

  // Validation
  const validateProject = (project: Project): boolean => {
    return (
      !!project.title && !!project.slug && !!project.status && !!project.date
    );
  };
  // ---- Btn Disabled when ? ----
  const disabled = isLoading || validateProject(currentProject);
  // Save handler
  const handleSave = async () => {
    if (!validateProject(currentProject)) {
      toast.error(t("requiredFieldsMissing"));
      return;
    }

    setIsLoading(true);

    try {
      const imagePath = imageFile ? `${imageFile.name}` : "";
      const projectData = {
        ...currentProject,
        technologies: currentProject.technologies || [],
      };

      if (isEditMode) {
        const projectId = currentRealProject?.id;
        if (!projectId) {
          toast.error("idErrorNotFound");
          return;
        }
        // Use existing image if no new image is selected
        if (!imageFile && currentRealProject?.image) {
          projectData.image = currentRealProject.image;
        }
        const success = await handleRowOperation(
          imageFile,
          imagePath,
          projectData,
          true,
          `projects-${locale}`,
          projectId
        );
        if (success) {
          dispatch(setCurrentProject(projectData));
          toast.success(t("updateSuccess"));
          await queryClient.invalidateQueries({
            queryKey: ["projects", locale],
          });
          setIsOpen(false);
        } else {
          toast.error(t("updateFailed"));
        }
      } else {
        const success = await handleRowOperation(
          imageFile,
          imagePath,
          projectData,
          false,
          `projects-${locale}`
        );
        if (success) {
          dispatch(setProjects([projectData])); // Assuming addProject action exists
          toast.success(t("addSuccess"));
          await queryClient.invalidateQueries({
            queryKey: ["projects", locale],
          });
          setIsOpen(false);
        } else {
          toast.error(t("addFailed"));
        }
      }
    } catch (error) {
      toast.error(t("saveError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          aria-label={t("addNewProject")}
          name="add new project"
          className={`bg-primary-dark cust-trans hover:bg-primary text-white  rounded-md flex items-center justify-between gap-2 ${style}`}
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
            {currentProject.image && (
              <div className="mt-2">
                <Image
                  width={100}
                  height={100}
                  src={currentProject.image}
                  alt="Preview"
                  className="h-20 w-auto object-contain rounded"
                />
              </div>
            )}
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
              value={getProjectValue("title")}
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
              value={getProjectValue("slug")}
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
                value={getProjectValue("isFeature")}
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
                value={getProjectValue("status")}
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
              value={getTechnologies()}
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
              value={getProjectValue("date")}
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
              value={getProjectValue("description")}
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
              value={getLinkValue("repo")}
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
              value={getLinkValue("live")}
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
              value={getProjectValue("video")}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <Button
          onClick={handleSave}
          className={`w-fit mx-auto cust-trans text-white ${
            !disabled ? "cursor-wait  opacity-50" : ""
          }`}
          disabled={!disabled}
        >
          {isEditMode ? t("save") : t("add")}
          {isLoading ? <FaSpinner className=" animate-spin" /> : null}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddAndEditDialog;
