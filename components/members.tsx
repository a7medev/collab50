import { Role } from '@prisma/client';
import { useState } from 'react';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

import type MemberT from '../types/member';
import AddButton from './add-button';
import Member from './member';
import Dialog from './dialog';
import AddMemberForm from './add-member-form';

interface MembersProps {
  projectId: number;
  className?: string;
  userId: number;
  role: Role;
  members: MemberT[];
  onAdd: (member: MemberT) => void;
  onRemove: (memberId: number, self?: boolean) => void;
}

const Members: React.FC<MembersProps> = ({
  className,
  role,
  userId,
  projectId,
  members,
  onAdd,
  onRemove,
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

            <AddMemberForm
              projectId={projectId}
              onAdd={(member) => {
                setShowAddDialog(false);
                onAdd(member);
              }}
            />
          </Dialog>
        )}
      </AnimatePresence>

      {members.map((member) => (
        <Member
          member={member}
          key={member.id}
          canRemove={role === Role.OWNER || member.userId === userId}
          onRemove={onRemove}
          self={member.userId === userId}
        />
      ))}
    </div>
  );
};

export default Members;
