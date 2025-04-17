import { PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaVideo } from "react-icons/fa";
import { Project } from "./ProjectsSection";
import { DeleteConfirmation } from "../DeleteConfirmation";
import AddAndEditDialog from "../AddAndEditDialog";

const BottomOfCard = ({ 
  project,
  onUpdate,
  onDelete
}: { 
  project: Project;
  onUpdate?: (updatedProject: Project) => void;
  onDelete?: (projectId: string | number) => void;
}) => {
  // State to control edit dialog visibility
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Handle project update
  const handleProjectUpdate = (updatedProject: Project) => {
    if (onUpdate) {
      onUpdate({
        ...updatedProject,
        id: project.id // Ensure the ID is preserved
      });
      console.log("Updated Project:====>", updatedProject);
    }
    console.log("Updated Project without realtime :====>", updatedProject);
  };

  // Handle project deletion
  const handleDelete = () => {
    if (onDelete && project.id) {
      onDelete(project.id);
    }
  };

  return (
    <div className="flex items-center justify-between max-sm:flex-wrap gap-4">
      {/* -------- Links -------- */}
      <div className="flex gap-3">
        {project.links?.repo && (
          <Link
            href={project.links?.repo}
            target="_blank"
            className="flex items-center gap-1 text-white bg-blue-400 text-sm hover:underline cust-trans justify-center w-6 h-6 rounded-sm"
          >
            <FaGithub size={14} />
          </Link>
        )}
        {project.links?.live && (
          <Link
            href={project.links?.live}
            target="_blank"
            className="flex items-center gap-1 text-white bg-green-400 text-sm hover:underline cust-trans justify-center w-6 h-6 rounded-sm"
          >
            <FaExternalLinkAlt size={14} />
          </Link>
        )}
        {project.video && (
          <Link
            href={project.video}
            target="_blank"
            className="flex items-center gap-1 text-white bg-red-400 text-sm hover:underline cust-trans justify-center w-6 h-6 rounded-sm"
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
          currentProject={project}
          onSubmit={handleProjectUpdate}
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