import type { ChangeEvent } from 'react';
import type { Todo } from '@prisma/client';

import Checkbox from './checkbox';
import cn from '../utils/classnames';
import { motion } from 'framer-motion';

interface TodoItemProps {
  todo: Todo;
  canEdit?: boolean;
  onCheck: (id: number, checked: boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onCheck, canEdit }) => {
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    onCheck(todo.id, checked);

    await fetch(`/api/projects/${todo.projectId}/todos/${todo.id}/check`, {
      method: 'POST',
      body: JSON.stringify({ completed: checked }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Checkbox
        className={cn(
          'border hover:bg-green-50 hover:border-green-300 rounded-lg px-4 py-3 mb-3 flex items-center',
          todo.completed && 'line-through text-gray-500'
        )}
        onChange={handleChange}
        checked={todo.completed}
        disabled={!canEdit}
      >
        {todo.title}
      </Checkbox>
    </motion.div>
  );
};

export default TodoItem;
