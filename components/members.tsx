import type { User, UsersOnProject } from '@prisma/client';

import Member from './member';
import UsersSearch from './users-search';

interface MembersProps {
  className?: string;
  members: (UsersOnProject & {
    user: Pick<User, 'id' | 'name' | 'username'>;
  })[];
}

const Members: React.FC<MembersProps> = ({ className, members }) => {
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-3">Members</h3>

      <UsersSearch />

      {members.map((member) => (
        <Member member={member} key={member.id} />
      ))}
    </div>
  );
};

export default Members;
