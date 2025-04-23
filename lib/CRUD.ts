import { toast } from "sonner";
import supabase from "./supabase";
import { Project } from "./types"; 

type AddProjectFunction = (
  state: Project,
  locale: string,
  t: (key: string) => string
) => Promise<void>;

export const addNewProject: AddProjectFunction = async (state, locale, t) => {
  const {
    title,
    image,
    slug,
    status,
    technologies,
    description,
    date,
    isFeature,
    video,
    links,
  } = state;
  // ----- Ready The Data to be sent to the server -----
  const projectData = {
    title,
    image,
    slug,
    status,
    technologies: technologies,
    description,
    date,
    isFeature: isFeature === "true",
    video,
    links,
  };
  // ---- Validation Input ----
  if (
    !title ||
    !status ||
    !image ||
    !slug ||
    !technologies ||
    !description ||
    !date ||
    !isFeature
  ) {
    toast.info("please fill required fields");
  } else {
    // ----- Send The Data to the server -----
    const { data, error } = await supabase
      .from(`projects-${locale}`)
      .insert([projectData])
      .select();
    // ----- Handle Error -----
    if (error) {
      toast.error("خطأ في إضافة المشروع");
      console.error("Error adding project:", error.message);
    }
    // ----- Handle Success -----
    else {
      toast.success(t("project_added_successfully"));
      console.log("Project added successfully:", data);
    }
  }
};
