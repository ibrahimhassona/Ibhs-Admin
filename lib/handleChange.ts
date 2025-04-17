import { Project } from "@/app/components/projects/ProjectsSection";
import { ChangeEvent, Dispatch, SetStateAction } from "react";



  export const handleChange =
  <T>(setFormData: Dispatch<SetStateAction<T>>) =>
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (
      name === "image" &&
      e.target instanceof HTMLInputElement &&
      e.target.files?.[0]
    ) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    } else if (name === "repo" || name === "live") {
      setFormData((prev) => ({
        ...prev,
        links: {
          ...(prev as Project).links,
          [name]: value,
        },
      }));
    } else if (name === "status" || name === "isFeature") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "true",
      }));
    } else if (name === "technologies") {
      const techArray = value.split(",").map((tech) => tech.trim());
      setFormData((prev) => ({
        ...prev,
        technologies: techArray as Array<string>,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };