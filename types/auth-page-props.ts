import type { User } from '@prisma/client';

interface AuthPageProps {
  user: Omit<User, 'password'>;
}

export default AuthPageProps;
