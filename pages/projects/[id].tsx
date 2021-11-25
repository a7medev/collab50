import type { NextPage } from 'next';
import type { Todo, Project, UsersOnProject, User } from '@prisma/client';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import type AuthPageProps from '../../types/auth-page-props';
import type { SuccessResponse } from '../../types/response';
import Layout from '../../components/layout';
import ErrorBox from '../../components/error-box';
import withAuth from '../../utils/with-auth';
import TodoList from '../../components/todo-list';
import produce from 'immer';
import Members from '../../components/members';

export const getServerSideProps = withAuth();

interface ProjectProps extends AuthPageProps {}

type Result = SuccessResponse<{
  project: UsersOnProject & {
    project: Project & {
      todos: Todo[];
      members: (UsersOnProject & {
        user: Pick<User, 'id' | 'name' | 'username'>;
      })[];
    };
  };
}>;

const Project: NextPage<ProjectProps> = ({ user }) => {
  const router = useRouter();
  const { data, error, mutate } = useSWR<Result>(
    `/api/projects/${router.query.id}`
  );

  const handleAdd = (todo: Todo) => {
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
                className="col-span-2"
                members={data.data.project.project.members}
              />
              <TodoList
                className="col-span-4"
                todos={data.data.project.project.todos}
                projectId={data.data.project.project.id}
                onItemCheck={handleItemCheck}
                onAdd={handleAdd}
              />
            </div>
          )
        )}
      </main>
    </Layout>
  );
};

export default Project;
