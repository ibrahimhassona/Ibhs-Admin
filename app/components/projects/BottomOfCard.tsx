import { PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaVideo } from "react-icons/fa";
import { DeleteConfirmation } from "../DeleteConfirmation";
import AddAndEditDialog from "../AddAndEditDialog";
import { Project } from "@/lib/types";
import { useAppDispatch } from "@/lib/hooks";
import { deletedProject } from "@/features/projects/projectsSlice";
import supabase from "@/lib/supabase";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { GoStarFill } from "react-icons/go";

const BottomOfCard = ({ project }: { project: Project }) => {
  const dispatch = useAppDispatch();
  // State to control edit dialog visibility
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("projects");
  // Handle project deletion
  const handleDelete = async () => {
    if (project.id) {
      const { error } = await supabase
        .from(`projects-${locale}`)
        .delete()
        .eq("id", project.id);
      if (!error) {
        dispatch(deletedProject(project));
        toast.success(t("deleteSuccess"));
      } else {
        toast.error(t("deleteFailed"));
      }
    }
  };
  const style =
    "flex items-center gap-1 text-sm hover:underline cust-trans justify-center w-6 h-6 rounded-sm "
  return (
    <div className="flex items-center justify-between max-sm:flex-wrap gap-4 mt-2">
      {/* -------- Links -------- */}
      <div className="flex gap-3">
        {project.links?.repo && (
          <Link
            href={project.links?.repo}
            target="_blank"
            className={`text-white bg-blue-400 ${style} `}
          >
            <FaGithub size={14} />
          </Link>
        )}
        {project.links?.live && (
          <Link
            href={project.links?.live}
            target="_blank"
            className={` text-white bg-green-400 ${style} `}
          >
            <FaExternalLinkAlt size={14} />
          </Link>
        )}
        {project.video && (
          <Link
            href={project.video}
            target="_blank"
            className={`text-white bg-red-400 ${style} `}
          >
            <FaVideo size={14} />
          </Link>
        )}
         {/* ------- IsFeature ------- */}
      {project.isFeature && 
      <span className=" text-yellow-500 px-1 py-[2px] rounded-md">
        <GoStarFill size={20} className=""/>
      </span>}
      </div>
      <div className="flex items-center gap-2">
        {/* Edit Dialog - Hidden until edit button is clicked */}
        <AddAndEditDialog
          isOpen={isEditDialogOpen}
          setIsOpen={setIsEditDialogOpen}
          isEditMode={true}
          currentRealProject={project}
          style="px-3 py-1.5"
        >
          <PencilIcon size={16} />
        </AddAndEditDialog>
        {/* Delete Confirmation */}
        <DeleteConfirmation
          style="px-3 py-1.5"
          onConfirm={handleDelete}
          title={project.title}
        >
          <Trash2Icon size={16} />
        </DeleteConfirmation>
      </div>
    </div>
  );
};

export default BottomOfCard;
