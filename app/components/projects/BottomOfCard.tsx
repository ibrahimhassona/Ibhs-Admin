import { PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaExternalLinkAlt, FaGithub, FaVideo } from "react-icons/fa";
import { Project } from "./ProjectsSection";

const BottomOfCard = ({ project }: { project: Project }) => {
  return (
    <div className="flex items-center justify-between max-sm:flex-wrap gap-4">
      {/* -------- Links -------- */}
      <div className=" flex gap-3">
        {project.github && (
          <Link
            href={project.github}
            target="_blank"
            className="flex items-center gap-1 text-white bg-blue-400 text-sm hover:underline cust-trans justify-center w-6 h-6 rounded-sm"
          >
            <FaGithub size={14} />
          </Link>
        )}
        {project.liveProject && (
          <Link
            href={project.liveProject}
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
        {/* -------- Delete & Edit -------- */}
      </div>
      <div className="flex items-center gap-4 max-sm:mx-auto">
        <button
          name="edit"
          aria-label="edit"
          className="p-1 cust-trans text-white bg-yellow-600 rounded-sm hover:bg-yellow-500"
          //   onClick={() => startEditing(index)}
        >
          <PencilIcon size={16} />
        </button>
        <button
          name="delete"
          aria-label="delete"
          className="p-1 cust-trans text-white bg-red-600 rounded-sm hover:bg-red-500"
          // onClick={() => deleteOpinion(index)}
        >
          <Trash2Icon size={16} />
        </button>
      </div>
    </div>
  );
};

export default BottomOfCard;
