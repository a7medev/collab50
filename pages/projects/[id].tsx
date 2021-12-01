import type { NextPage } from 'next';
import type { Todo, Project, UsersOnProject } from '@prisma/client';
import { Role } from '@prisma/client';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import produce from 'immer';

import type AuthPageProps from '../../types/auth-page-props';
import type Member from '../../types/member';
import type { SuccessResponse } from '../../types/response';
import Layout from '../../components/layout';
import ErrorBox from '../../components/error-box';
import withAuth from '../../utils/with-auth';
import TodoList from '../../components/todo-list';
import Members from '../../components/members';

export const getServerSideProps = withAuth();

interface ProjectProps extends AuthPageProps {}

type Result = SuccessResponse<{
  project: UsersOnProject & {
    project: Project & {
      todos: Todo[];
      members: Member[];
    };
  };
}>;

const Project: NextPage<ProjectProps> = ({ user }) => {
  const router = useRouter();
  const { data, error, mutate } = useSWR<Result>(
    `/api/projects/${router.query.id}`
  );

  const handleAddItem = (todo: Todo) => {
    mutate((data) => {
      if (!data) return;

      return produce(data, (draft) => {
        draft.data.project.project.todos.push(todo);
      });
    }, false);
  };

  const handleItemCheck = (itemId: number, checked: boolean) => {
    mutate((data) => {
      if (!data) return;

      return produce(data, (draft) => {
        const { todos } = draft.data.project.project;
        const item = todos.findIndex((it) => it.id === itemId);
        todos[item].completed = checked;
      });
    }, false);
  };

  const handleAddMember = (member: Member) => {
    mutate((data) => {
      if (!data) return;

      return produce(data, (draft) => {
        draft.data.project.project.members.push(member);
      });
    });
  };

  const handleRemoveMember = (memberId: number, self?: boolean) => {
    if (self) {
      return router.push('/projects');
    }

    mutate((data) => {
      if (!data) return;

      return produce(data, (draft) => {
        const { members } = draft.data.project.project;
        const member = members.findIndex((it) => it.id === memberId);
        members.splice(member, 1);
      });
    });
  };

  return (
    <Layout title="Project" user={user}>
      <main className="container mx-auto p-6">
        <h1 className="text-xl font-semibold mb-4">
          {data?.data.project.project.name || 'Project'}
        </h1>

        {error ? (
          <ErrorBox>{error.info?.message || 'Something went wrong'}</ErrorBox>
        ) : (
          data && (
            <div className="grid grid-cols-6 gap-6">
              <Members
                projectId={data.data.project.project.id}
                className="col-span-2"
                members={data.data.project.project.members}
                role={data.data.project.role}
                userId={user.id}
                onAdd={handleAddMember}
                onRemove={handleRemoveMember}
              />
              <TodoList
                className="col-span-4"
                todos={data.data.project.project.todos}
                projectId={data.data.project.project.id}
                onItemCheck={handleItemCheck}
                onAdd={handleAddItem}
                canEdit={
                  data.data.project.role === Role.OWNER ||
                  data.data.project.role === Role.EDITOR
                }
              />
            </div>
          )
        )}
      </main>
    </Layout>
  );
};

export default Project;
