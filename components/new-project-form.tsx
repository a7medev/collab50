import type { Project } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import type { ErrorResponse, SuccessResponse } from '../types/response';
import Button from './button';
import ErrorBox from './error-box';
import Input from './input';
import newProjectSchema from '../validation/new-project-schema';

interface NewProjectFormProps {
  onDone: (project: Project) => void;
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({ onDone }) => {
  const [error, setError] = useState<ErrorResponse | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(newProjectSchema),
  });

  const onSubmit = async (data: unknown) => {
    setError(null);

    const res = await fetch('/api/projects/new', {
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

    const {
      data: { project },
    }: SuccessResponse<{ project: Project }> = await res.json();

    onDone(project);
  };

  return (
    <>
      {error && <ErrorBox>{error.message}</ErrorBox>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Project Name"
          className="mb-3"
          error={errors.name}
          {...register('name')}
        />

        <Button
          className="w-full mb-3 bg-green-500 hover:bg-green-600"
          disabled={isSubmitting}
        >
          Add Project
        </Button>
      </form>
    </>
  );
};

export default NewProjectForm;
