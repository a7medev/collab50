import { User, Role } from '@prisma/client';

import Avatar from './avatar';
import capetalize from '../utils/capetalize';
import cn from '../utils/classnames';

interface UserDetailsProps {
  user: Pick<User, 'name' | 'username'>;
  role?: Role;
  className?: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ className, user, role }) => {
  return (
    <div className={cn('flex items-center', className)}>
      <Avatar username={user.username} />

      <div className="ml-3 text-left">
        <p className="text-lg">
          {user.name}
          {role && (
            <>
              {' '}
              -
              <span className="rounded-full text-sm px-3 py-1 bg-green-500 text-white ml-1">
                {capetalize(role)}
              </span>
            </>
          )}
        </p>
        <p className="text-gray-500">@{user.username}</p>
      </div>
    </div>
  );
};

export default UserDetails;
