import Head from 'next/head';

import Navbar from './navbar';

interface LayoutProps {
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div>
      <Head>
        <title>{title} | Collab50</title>
      </Head>

      <Navbar />

      {children}
    </div>
  );
};

export default Layout;
