import React from 'react'
import { Project } from './ProjectsSection'
import Image from 'next/image'
import BottomOfCard from './BottomOfCard'

const ProjectCard = ({project}:{project:Project}) => {
  return (
    <div
    key={project.id}
    className=" p-4 rounded-lg shadow-lg flex flex-col gap-2 justify-between  border borderColor"
  >
    <Image
      src={project.image}
      alt={project.title}
      priority
      height={300}
      width={300}
      className="w-full h-40 object-cover rounded-md "
    />
    <h3 className="text-lg font-semibold">{project.title}</h3>
    <p className=" text-sm">{project.status}</p>
    <p className=" text-xs ">{project.publishDate}</p>
    <p className=" text-sm ">{project.description}</p>

    <div className="flex flex-wrap gap-2 ">
      {project.technologies.map((tech, index) => (
        <span
          key={index}
          className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md"
        >
          {tech}
        </span>
      ))}
    </div>

    <BottomOfCard project={project} />
  </div>
  )
}

export default ProjectCard