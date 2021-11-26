import type { User, UsersOnProject } from '@prisma/client';

import Avatar from './avatar';
import capetalize from '../utils/capetalize';
import UserDetails from './user-details';

interface MemberProps {
  member: UsersOnProject & {
    user: Pick<User, 'id' | 'name' | 'username'>;
  };
}

const Member: React.FC<MemberProps> = ({ member }) => {
  return (
    <div className="border hover:bg-green-50 hover:border-green-300 rounded-lg px-4 py-3 mb-3">
      <UserDetails user={member.user} role={member.role} />
    </div>
  );
};

export default Member;
