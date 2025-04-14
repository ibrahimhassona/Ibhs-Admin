"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { MdAdd } from "react-icons/md";
import ProjectsList from "./ProjectsList";
import { getProjects } from "@/lib/getData";
import { useLocale } from "next-intl";

export interface Project {
  id: string; 
  image: string;
  title: string;
  status: string;
  technologies: string[];
  description: string;
  date: string;
  isFeature: boolean;
  video: string;
  links: {
    live: string;
    repo: string;
  };
}

  
export default function ProjectsComponent() {
  const [isAdding, setIsAdding] = useState(false);
  const [projects, setProjects] = useState<Project[] | null>([]);
  // const [newProject, setNewProject] = useState<Omit<Project, "id">>({
  //   image: "",
  //   title: "",
  //   status: "",
  //   technologies: [],
  //   publishDate: "",
  //   description: "",
  //   github: "",
  //   liveProject: "",
  //   video: "",
  // });
const locale = useLocale()
  useEffect(()=>{
    const featchData = async()=>{
     const { projects, error } = await getProjects(locale)
     if(error){
      console.error(error.message)
      setProjects(null)
     }else{
      setProjects(projects)
     }
    }
    featchData()
  },[locale])

console.log(projects)
  // const handleAddProject = () => {
    // if (!newProject.title.trim() || !newProject.image) return;

    // setProjects((prev) => [{ id: prev.length + 1, ...newProject }, ...prev]);

  //   setNewProject({
  //     image: "",
  //     title: "",
  //     status: "",
  //     technologies: [],
  //     publishDate: "",
  //     description: "",
  //     github: "",
  //     liveProject: "",
  //     video: "",
  //   });

  //   setIsAdding(false);
  // };

  return (
    <section className="">
      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogTrigger asChild>
          <button
            aria-label="add new project"
            name="add new project"
            className="bg-primary-dark cust-trans hover:bg-primary text-white px-4 py-2 rounded-md flex items-center justify-between gap-2"
          >
            {" "}
            إضافة مشروع جديد <MdAdd size={20} />
          </button>
        </DialogTrigger>
        <DialogContent className=" bg-background-light dark:bg-background-dark p-6 rounded-xl overflow-y-auto max-h-[80vh]">
          <DialogTitle>
            <VisuallyHidden>إضافة مشروع جديد</VisuallyHidden>
          </DialogTitle>
          <h3 className=" font-bold mb-4">إضافة مشروع جديد </h3>
          <div className="space-y-3">
            <Input
              type="file"
              accept="image/*"
              // onChange={(e) =>
              //   setNewProject((prev) => ({
              //     ...prev,
              //     image: e.target.files?.[0]
              //       ? URL.createObjectURL(e.target.files[0])
              //       : "",
              //   }))
              // }
            />
            <Input
              placeholder="عنوان المشروع"
              // // value={newProject.title}
              // onChange={(e) =>
              //   setNewProject((prev) => ({ ...prev, title: e.target.value }))
              // }
            />
            <Input
              placeholder="حالة المشروع"
              // value={newProject.status}
              // onChange={(e) =>
              //   setNewProject((prev) => ({ ...prev, status: e.target.value }))
              // }
            />
            <Textarea
              placeholder="التقنيات (افصل بين كل تقنية بفاصلة)"
              // value={newProject.technologies.join(", ")}
              // onChange={(e) =>
              //   setNewProject((prev) => ({
              //     ...prev,
              //     technologies: e.target.value
              //       .split(",")
              //       .map((tech) => tech.trim()),
              //   }))
              // }
            />
            <Input
              placeholder="تاريخ النشر"
              // value={newProject.publishDate}
              // onChange={(e) =>
              //   setNewProject((prev) => ({
              //     ...prev,
              //     publishDate: e.target.value,
              //   }))
              // }
            />
            <Textarea
              placeholder="الوصف"
              // value={newProject.description}
              // onChange={(e) =>
              //   setNewProject((prev) => ({
              //     ...prev,
              //     description: e.target.value,
              //   }))
              // }
            />
            <Input
              placeholder="رابط GitHub"
              // value={newProject.github}
              // onChange={(e) =>
              //   setNewProject((prev) => ({ ...prev, github: e.target.value }))
              // }
            />
            <Input
              placeholder="رابط المشروع المباشر"
              // value={newProject.liveProject}
              // onChange={(e) =>
              //   setNewProject((prev) => ({
              //     ...prev,
              //     liveProject: e.target.value,
              //   }))
              // }
            />
            <Input
              placeholder="رابط الفيديو"
              // value={newProject.video}
              // onChange={(e) =>
              //   setNewProject((prev) => ({ ...prev, video: e.target.value }))
              // }
            />
          </div>

          <Button
            // onClick={handleAddProject}
            className="w-fit mx-auto  cust-trans text-white"
          >
            حفظ المشروع
          </Button>
        </DialogContent>
      </Dialog>

      {/* قائمة المشاريع */}
      <ProjectsList projects={projects} />
    </section>
  );
}
