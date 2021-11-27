import type { User, UsersOnProject } from '@prisma/client';
import { Role } from '@prisma/client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import AddButton from './add-button';
import Member from './member';
import Dialog from './dialog';
import AddMemberForm from './add-member-form';

interface MembersProps {
  projectId: number;
  className?: string;
  userId: number;
  role: Role;
  members: (UsersOnProject & {
    user: Pick<User, 'id' | 'name' | 'username'>;
  })[];
}

const Members: React.FC<MembersProps> = ({
  className,
  role,
  userId,
  projectId,
  members,
}) => {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-3">
        Members
        {role === Role.OWNER && (
          <AddButton onClick={() => setShowAddDialog(true)} hint="Add member" />
        )}
      </h3>

      <AnimatePresence>
        {showAddDialog && (
          <Dialog
            onDismiss={() => setShowAddDialog(false)}
            aria-labelledby="Add member"
          >
            <h3 className="text-lg font-semibold mb-4">Add Member</h3>

            <AddMemberForm projectId={projectId} />
          </Dialog>
        )}
      </AnimatePresence>

      {members.map((member) => (
        <Member
          member={member}
          key={member.id}
          canDelete={role === Role.OWNER || member.userId === userId}
          self={member.userId === userId}
        />
      ))}
    </div>
  );
};

export default Members;
