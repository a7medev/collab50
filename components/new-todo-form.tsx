import type { Todo } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import type { ErrorResponse, SuccessResponse } from '../types/response';
import Button from './button';
import Input from './input';
import ErrorBox from './error-box';
import newTodoSchema from '../validation/new-todo-schema';

interface NewTodoFormProps {
  projectId: number;
  onAdd: (todo: Todo) => void;
}

const NewTodoForm: React.FC<NewTodoFormProps> = ({ projectId, onAdd }) => {
  const [error, setError] = useState<ErrorResponse | null>(null);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(newTodoSchema),
  });

  const onSubmit = async (data: unknown) => {
    setError(null);

    const res = await fetch(`/api/projects/${projectId}/todos/new`, {
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
      data: { todo },
    }: SuccessResponse<{ todo: Todo }> = await res.json();

    reset();
    onAdd(todo);
  };

  return (
    <>
      {error && <ErrorBox>{error.message}</ErrorBox>}

      <form className="flex items-start mb-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          noRightRound
          className="flex-1"
          placeholder="e.g. Implement spell checker"
          error={errors.title}
          {...register('title')}
        />

        <Button
          className="bg-green-500 hover:bg-green-600 rounded-l-none"
          disabled={isSubmitting}
        >
          Add
        </Button>
      </form>
    </>
  );
};

export default NewTodoForm;
