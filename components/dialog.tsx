import '@reach/dialog/styles.css';
import type { KeyboardEvent, MouseEvent } from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import { motion } from 'framer-motion';

import cn from '../utils/classnames';

const MotionDialogContent = motion(DialogContent);
const MotionDialogOverlay = motion(DialogOverlay);

interface DialogProps extends React.ComponentProps<typeof MotionDialogContent> {
  onDismiss?: (event: MouseEvent | KeyboardEvent) => void;
}

const Dialog: React.FC<DialogProps> = ({
  children,
  onDismiss,
  className,
  ...props
}) => {
  return (
    <MotionDialogOverlay
      className="backdrop-filter backdrop-blur-sm"
      onDismiss={onDismiss}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MotionDialogContent
        {...props}
        className={cn('rounded-lg', className)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        {children}
      </MotionDialogContent>
    </MotionDialogOverlay>
  );
};

export default Dialog;
