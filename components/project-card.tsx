import type { Project, UsersOnProject } from '@prisma/client';
import Link from 'next/link';

import cn from '../utils/classnames';

interface ProjectCardProps {
  project: UsersOnProject & { project: Project };
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  const createdAt = new Date(project.project.createdAt).toLocaleString();

  return (
    <Link href={`/projects/${project.id}`}>
      <a>
        <div
          className={cn(
            'py-3 px-4 rounded-lg border hover:border-green-500',
            className
          )}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{project.project.name}</h3>
            <span className="rounded-full px-3 py-1 bg-green-500 text-white">
              {project.role.toLowerCase()}
            </span>
          </div>

          <time className="italic text-gray-600">Started at {createdAt}</time>
        </div>
      </a>
    </Link>
  );
};

export default ProjectCard;
