import type { User, UsersOnProject } from '@prisma/client';

import UserDetails from './user-details';

interface MemberProps {
  member: UsersOnProject & {
    user: Pick<User, 'id' | 'name' | 'username'>;
  };
  self?: boolean;
  canDelete?: boolean;
}

const Member: React.FC<MemberProps> = ({ member, self, canDelete }) => {
  const handleDelete = async () => {
    const res = await fetch(
      `/api/projects/${member.projectId}/members/${member.userId}/remove`,
      {
        method: 'POST',
      }
    );

    if (!res.ok) {
      // TODO: change to better UX
      return alert('Failed to remove member');
    }

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="border rounded-lg px-4 py-3 mb-3 flex items-center justify-between">
      <UserDetails user={member.user} role={member.role} />
      {canDelete && (
        <button
          onClick={handleDelete}
          className="ml-3 rounded-full w-10 h-10 bg-red-100 text-red-600 hover:bg-red-200 transform focus:scale-90 flex items-center justify-center"
        >
          <span className="sr-only">
            {self ? 'Leave project' : `Remove ${member.user.name}`}
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {self ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            )}
          </svg>
        </button>
      )}
    </div>
  );
};

export default Member;
