import type { User } from '@prisma/client';
import Head from 'next/head';

import Navbar from './navbar';

interface LayoutProps {
  title: string;
  user?: Omit<User, 'password'>;
}

const Layout: React.FC<LayoutProps> = ({ user, children, title }) => {
  return (
    <div>
      <Head>
        <title>{title} | Collab50</title>
      </Head>

      <Navbar user={user} />

      {children}
    </div>
  );
};

export default Layout;
