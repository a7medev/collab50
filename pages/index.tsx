import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import Navbar from '../components/navbar';
import todoGirlImage from '../images/todo-girl.svg';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Collab50</title>
      </Head>

      <Navbar />

      <main className="container mx-auto p-6 text-center lg:text-left lg:flex">
        <div className="lg:order-2">
          <Image src={todoGirlImage} alt="Girl with Todo List" />
        </div>

        <div className="lg:flex-shrink lg:flex lg:flex-col lg:justify-center lg:items-start lg:mr-auto lg:order-1">
          <h1 className="font-bold text-6xl mb-4">
            This is Collab<span className="text-green-500">50</span>.
          </h1>

          <p className="text-xl text-gray-600 mb-10">
            A project planning collaboration tool, built for teams.
          </p>

          <Link href="/register">
            <a className="py-4 px-8 text-lg text-white rounded-lg bg-green-500 hover:bg-green-600 transition-colors">
              Get Started
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
