import { PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaVideo } from "react-icons/fa";
import { DeleteConfirmation } from "../DeleteConfirmation";
import AddAndEditDialog from "../AddAndEditDialog";
import { Project } from "@/lib/types";
import { useAppDispatch } from "@/lib/hooks";
import {
  deleteProject,
} from "@/features/projects/projectsSlice";

const BottomOfCard = ({ project }: { project: Project }) => {
  const dispatch = useAppDispatch();
  // State to control edit dialog visibility
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Handle project update
  // const handleProjectUpdate = (updatedProject: Project) => {
  //   if (onUpdate) {
  //     onUpdate({
  //       ...updatedProject,
  //       id: project.id, // Ensure the ID is preserved
  //     });
  //     console.log("Updated Project:====>", updatedProject);
  //   }
  //   console.log("Updated Project without realtime :====>", updatedProject);
  // };

  // Handle project deletion
  const handleDelete = () => {
    if (project.id) {
      dispatch(deleteProject(project.id));
    } else {
      console.log("Project ID is missing");
    }
  };
  const style ="flex items-center gap-1 text-sm hover:underline cust-trans justify-center w-6 h-6 rounded-sm";
  return (
    <div className="flex items-center justify-between max-sm:flex-wrap gap-4">
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
      </div>
      <div className="flex items-center gap-2">
        {/* Edit Dialog - Hidden until edit button is clicked */}
        <AddAndEditDialog
          isOpen={isEditDialogOpen}
          setIsOpen={setIsEditDialogOpen}
          isEditMode={true}
          currentRealProject={project}
          // onSubmit={handleProjectUpdate}
        >
          <PencilIcon size={16} />
        </AddAndEditDialog>

        {/* Delete Confirmation */}
        <DeleteConfirmation onConfirm={handleDelete}>
          <Trash2Icon size={16} />
        </DeleteConfirmation>
      </div>
    </div>
  );
};

export default BottomOfCard;
