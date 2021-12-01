import type { User, UsersOnProject } from '@prisma/client';

type Member = UsersOnProject & {
  user: Pick<User, 'id' | 'name' | 'username'>;
};

export default Member;
