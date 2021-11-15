import type { NextPage } from 'next';
import type { Project, UsersOnProject } from '@prisma/client';
import useSWR from 'swr';

import type AuthPageProps from '../../types/auth-page-props';
import type { SuccessResponse } from '../../types/response';
import Layout from '../../components/layout';
import withAuth from '../../utils/with-auth';

import ProjectCard from '../../components/project-card';

export const getServerSideProps = withAuth();

interface ProjectsProps extends AuthPageProps {}

const Projects: NextPage<ProjectsProps> = ({ user }) => {
  type Result = SuccessResponse<{
    projects: (UsersOnProject & { project: Project })[];
  }>;
  const { data, error } = useSWR<Result>('/api/projects');

  return (
    <Layout title="Projects" user={user}>
      <main className="container mx-auto p-6">
        <h1 className="text-xl font-bold mb-4">Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {data?.data.projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Projects;
