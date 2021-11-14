import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import type { ErrorResponse } from '../types/response';
import Button, { LinkButton } from '../components/button';
import Input from '../components/input';
import Layout from '../components/layout';
import ErrorBox from '../components/error-box';
import withoutAuth from '../utils/without-auth';
import registerSchema from '../validation/register-schema';

export const getServerSideProps = withoutAuth();

const Register: NextPage = () => {
  const router = useRouter();
  const [error, setError] = useState<ErrorResponse | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: unknown) => {
    setError(null);

    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const err: ErrorResponse = await res.json();
      return setError(err);
    }

    router.push('/projects');
  };

  return (
    <Layout title="Register">
      <main className="container mx-auto p-6">
        <div className="max-w-xl w-11/12 mx-auto rounded-lg p-5 shadow text-center">
          <h1 className="text-3xl font-bold mb-5">Register now!</h1>

          {error && <ErrorBox>{error.message}</ErrorBox>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="Full Name"
              className="mb-3"
              error={errors.name}
              {...register('name')}
            />
            <Input
              placeholder="Username"
              className="mb-3"
              error={errors.username}
              {...register('username')}
            />
            <Input
              placeholder="Password"
              type="password"
              className="mb-4"
              error={errors.password}
              {...register('password')}
            />

            <Button className="w-full mb-3" disabled={isSubmitting}>
              Register
            </Button>

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

export default Register;
