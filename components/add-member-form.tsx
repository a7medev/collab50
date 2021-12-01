import { Role } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import type { ErrorResponse, SuccessResponse } from '../types/response';
import type Member from '../types/member';
import Button from './button';
import ErrorBox from './error-box';
import UsersSearch from './users-search';
import addMemberSchema from '../validation/add-member-schema';
import Select from './select';
import capetalize from '../utils/capetalize';

interface AddMemberFormProps {
  projectId: number;
  onAdd: (member: Member) => void;
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({ projectId, onAdd }) => {
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

    const res = await fetch(`/api/projects/${projectId}/members/add`, {
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
      data: { member },
    }: SuccessResponse<{ member: Member }> = await res.json();

    onAdd(member);
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
