import type { NextPage } from 'next';

import type AuthPageProps from '../../types/auth-page-props';
import Layout from '../../components/layout';
import withAuth from '../../utils/with-auth';

export const getServerSideProps = withAuth();

interface ProjectsProps extends AuthPageProps {}

const Projects: NextPage<ProjectsProps> = ({ user }) => {
  return (
    <Layout title="Projects" user={user}>
      <main className="container mx-auto p-6 text-center lg:text-left lg:flex"></main>
    </Layout>
  );
};

export default Projects;
