import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import type { ErrorResponse, SuccessResponse } from '../types/response';
import Button from './button';
import ErrorBox from './error-box';
import UsersSearch from './users-search';
import addMemberSchema from '../validation/add-member-schema';
import Select from './select';
import { Role } from '.prisma/client';
import capetalize from '../utils/capetalize';

interface AddMemberFormProps {
  projectId: number;
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({ projectId }) => {
  const [error, setError] = useState<ErrorResponse | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(addMemberSchema),
  });

  const onSubmit = async (data: unknown) => {
    setError(null);

    const res = await fetch(`/api/projects/${projectId}/add-member`, {
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
  };

  return (
    <>
      {error && <ErrorBox>{error.message}</ErrorBox>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <UsersSearch
          error={errors.username}
          placeholder="User (username)"
          className="mb-3"
          {...register('username')}
        />

        <Select error={errors.role} className="mb-3" {...register('role')}>
          <option value="" selected disabled>
            Role
          </option>

          {Object.keys(Role).map((role) => (
            <option key={role} value={role}>
              {capetalize(role)}
            </option>
          ))}
        </Select>

        <Button
          className="w-full mb-3 bg-green-500 hover:bg-green-600"
          disabled={isSubmitting}
        >
          Add Member
        </Button>
      </form>
    </>
  );
};

export default AddMemberForm;
