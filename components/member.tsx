import type { User, UsersOnProject } from '@prisma/client';
import Avatar from './avatar';

interface MemberProps {
  member: UsersOnProject & {
    user: Pick<User, 'id' | 'name' | 'username'>;
  };
}

const Member: React.FC<MemberProps> = ({ member }) => {
  return (
    <div className="border hover:bg-green-50 hover:border-green-300 rounded-lg px-4 py-3 mb-3 flex items-center">
      <Avatar username={member.user.username} />

      <div className="ml-3 text-left">
        <p className="text-lg">
          {member.user.name} -{' '}
          <span className="rounded-full text-sm px-3 py-1 bg-green-500 text-white">
            {member.role.toLowerCase()}
          </span>
        </p>
        <p className="text-gray-500">@{member.user.username}</p>
      </div>
    </div>
  );
};

export default Member;
