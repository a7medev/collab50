import type { NextPage } from 'next';
import Button, { LinkButton } from '../components/button';
import Input from '../components/input';

import Layout from '../components/layout';

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <main className="container mx-auto p-6">
        <div className="max-w-xl w-11/12 mx-auto rounded-lg p-5 shadow text-center">
          <h1 className="text-3xl font-bold mb-5">Register now!</h1>

          <form>
            <Input placeholder="Full Name" className="mb-3" />
            <Input placeholder="Username" className="mb-3" />
            <Input placeholder="Password" type="password" className="mb-4" />

            <Button className="w-full mb-3">Register</Button>

            <LinkButton
              href="/login"
              className="w-full"
              color="gray-500"
              hoverColor="gray-600"
            >
              Login Instead
            </LinkButton>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
