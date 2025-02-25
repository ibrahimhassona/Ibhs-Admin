"use client";

import { useState } from "react";
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

export interface Project {
  id: number;
  image: string;
  title: string;
  status: string;
  technologies: string[];
  publishDate: string;
  description: string;
  github: string;
  liveProject: string;
  video: string;
}
export const sampleProjects: Project[] = [
    {
      id: 1,
      image: "/images/project1.jpg",
      title: "منصة التجارة الإلكترونية",
      status: "مكتمل",
      technologies: ["Next.js", "TypeScript", "TailwindCSS"],
      publishDate: "2024-02-15",
      description: "منصة متكاملة لبيع المنتجات عبر الإنترنت مع نظام إدارة المخزون.",
      github: "https://github.com/user/ecommerce-platform",
      liveProject: "https://ecommerce-platform.live",
      video: "https://youtube.com/demo-ecommerce",
    },
    {
      id: 2,
      image: "/images/project2.jpg",
      title: "تطبيق إدارة المهام",
      status: "قيد التطوير",
      technologies: ["React", "Redux", "Material UI"],
      publishDate: "2024-03-10",
      description: "تطبيق لإدارة المهام اليومية مع إمكانية تحديد المواعيد والتنبيهات.",
      github: "https://github.com/user/task-manager",
      liveProject: "",
      video: "",
    },
    {
      id: 3,
      image: "/images/project3.jpg",
      title: "نظام حجز المواعيد",
      status: "مكتمل",
      technologies: ["Vue", "Nuxt.js", "SCSS"],
      publishDate: "2023-12-20",
      description: "تطبيق ويب لحجز المواعيد وإدارتها للأطباء والاستشارات.",
      github: "https://github.com/user/appointment-system",
      liveProject: "https://appointment-system.live",
      video: "https://youtube.com/appointment-demo",
    },
    {
      id: 4,
      image: "/images/project4.jpg",
      title: "مدونة تقنية",
      status: "جاري الصيانة",
      technologies: ["Gatsby", "GraphQL", "Styled Components"],
      publishDate: "2024-01-05",
      description: "مدونة تقنية تحتوي على مقالات تعليمية في البرمجة وتطوير الويب.",
      github: "https://github.com/user/tech-blog",
      liveProject: "https://tech-blog.live",
      video: "",
    },
    {
      id: 5,
      image: "/images/project5.jpg",
      title: "تطبيق الطقس",
      status: "مكتمل",
      technologies: ["React Native", "Expo", "API Integration"],
      publishDate: "2024-02-28",
      description: "تطبيق يعرض حالة الطقس بناءً على الموقع الجغرافي للمستخدم.",
      github: "https://github.com/user/weather-app",
      liveProject: "",
      video: "https://youtube.com/weather-app-demo",
    },
  ];
  
export default function ProjectsComponent() {
  const [isAdding, setIsAdding] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    image: "",
    title: "",
    status: "",
    technologies: [],
    publishDate: "",
    description: "",
    github: "",
    liveProject: "",
    video: "",
  });

  const handleAddProject = () => {
    if (!newProject.title.trim() || !newProject.image) return;

    setProjects((prev) => [{ id: prev.length + 1, ...newProject }, ...prev]);

    setNewProject({
      image: "",
      title: "",
      status: "",
      technologies: [],
      publishDate: "",
      description: "",
      github: "",
      liveProject: "",
      video: "",
    });

    setIsAdding(false);
  };

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
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev,
                  image: e.target.files?.[0]
                    ? URL.createObjectURL(e.target.files[0])
                    : "",
                }))
              }
            />
            <Input
              placeholder="عنوان المشروع"
              value={newProject.title}
              onChange={(e) =>
                setNewProject((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <Input
              placeholder="حالة المشروع"
              value={newProject.status}
              onChange={(e) =>
                setNewProject((prev) => ({ ...prev, status: e.target.value }))
              }
            />
            <Textarea
              placeholder="التقنيات (افصل بين كل تقنية بفاصلة)"
              value={newProject.technologies.join(", ")}
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev,
                  technologies: e.target.value
                    .split(",")
                    .map((tech) => tech.trim()),
                }))
              }
            />
            <Input
              placeholder="تاريخ النشر"
              value={newProject.publishDate}
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev,
                  publishDate: e.target.value,
                }))
              }
            />
            <Textarea
              placeholder="الوصف"
              value={newProject.description}
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <Input
              placeholder="رابط GitHub"
              value={newProject.github}
              onChange={(e) =>
                setNewProject((prev) => ({ ...prev, github: e.target.value }))
              }
            />
            <Input
              placeholder="رابط المشروع المباشر"
              value={newProject.liveProject}
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev,
                  liveProject: e.target.value,
                }))
              }
            />
            <Input
              placeholder="رابط الفيديو"
              value={newProject.video}
              onChange={(e) =>
                setNewProject((prev) => ({ ...prev, video: e.target.value }))
              }
            />
          </div>

          <Button
            onClick={handleAddProject}
            className="w-fit mx-auto  cust-trans text-white"
          >
            حفظ المشروع
          </Button>
        </DialogContent>
      </Dialog>

      {/* قائمة المشاريع */}
      <ProjectsList projects={sampleProjects} />
    </section>
  );
}
