import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import type MemberT from '../types/member';
import Button from './button';
import UserDetails from './user-details';

interface MemberProps {
  member: MemberT;
  self?: boolean;
  canRemove?: boolean;
  onRemove: (memberId: number, self?: boolean) => void;
}

const Member: React.FC<MemberProps> = ({
  member,
  self,
  canRemove,
  onRemove,
}) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
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

    onRemove(member.userId, self);
  };

  return (
    <div className="border rounded-lg px-4 py-3 mb-3">
      <div className="flex items-center justify-between">
        <UserDetails user={member.user} role={member.role} />
        {canRemove && (
          <button
            onClick={() => setIsRemoving(true)}
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
              aria-hidden
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
      <AnimatePresence>
        {isRemoving && (
          <motion.div
            className="bg-red-50 rounded-lg overflow-hidden"
            initial={{ height: 0, marginTop: 0 }}
            animate={{ height: 'auto', marginTop: '0.5rem' }}
            exit={{ height: 0, marginTop: 0 }}
          >
            <div className="p-3">
              <p className="mb-3 text-red-700">
                {self
                  ? 'Are you sure you want to leave this project?'
                  : `Are you sure you want to remove ${member.user.name}?`}
              </p>

              <Button
                className="bg-red-500 text-white mr-2 hover:bg-red-600 pt-1 pb-1"
                onClick={handleRemove}
              >
                {self ? 'Leave' : 'Remove'}
              </Button>
              <Button
                className="bg-green-500 text-white hover:bg-green-600 pt-1 pb-1"
                onClick={() => setIsRemoving(false)}
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Member;
