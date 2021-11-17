import type { ChangeEvent } from 'react';
import type { Todo } from '@prisma/client';

import Checkbox from './checkbox';
import cn from '../utils/classnames';

interface TodoItemProps {
  todo: Todo;
  onCheck: (id: number, checked: boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onCheck }) => {
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
    <Checkbox
      className={cn(
        'border hover:bg-green-50 hover:border-green-300 rounded-lg px-4 py-3 mb-3 flex items-center',
        todo.completed && 'line-through text-gray-500'
      )}
      onChange={handleChange}
      checked={todo.completed}
    >
      {todo.title}
    </Checkbox>
  );
};

export default TodoItem;
