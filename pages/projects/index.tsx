import type { NextPage } from 'next';
import type { Project, UsersOnProject } from '@prisma/client';
import router from 'next/router';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import useSWR from 'swr';

import type AuthPageProps from '../../types/auth-page-props';
import type { SuccessResponse } from '../../types/response';
import Layout from '../../components/layout';
import ProjectCard from '../../components/project-card';
import Dialog from '../../components/dialog';
import NewProjectForm from '../../components/new-project-form';
import withAuth from '../../utils/with-auth';

export const getServerSideProps = withAuth();

interface ProjectsProps extends AuthPageProps {}

type Result = SuccessResponse<{
  projects: (UsersOnProject & { project: Project })[];
}>;

const Projects: NextPage<ProjectsProps> = ({ user }) => {
  const { data, error } = useSWR<Result>('/api/projects');
  const [showNewDialog, setShowNewDialog] = useState(false);

  return (
    <Layout title="Projects" user={user}>
      <main className="container mx-auto p-6">
        <h1 className="text-xl font-semibold mb-4">
          Projects
          <button
            onClick={() => setShowNewDialog(true)}
            className="ml-4 h-7 w-7 rounded-full inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white transition-colors"
          >
            <span aria-hidden>+</span>
            <span className="sr-only">Add new project</span>
          </button>
        </h1>

        <AnimatePresence>
          {showNewDialog && (
            <Dialog
              onDismiss={() => setShowNewDialog(false)}
              aria-labelledby="Add new project"
            >
              <h3 className="text-lg font-semibold mb-4">New Project</h3>

              <NewProjectForm
                onDone={(project) => router.push(`/projects/${project.id}`)}
              />
            </Dialog>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {data?.data.projects.map((project) => (
            <ProjectCard project={project} key={project.project.id} />
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Projects;
