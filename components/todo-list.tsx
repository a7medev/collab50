import type { Todo } from '@prisma/client';
import { AnimatePresence } from 'framer-motion';

import NewTodoForm from './new-todo-form';
import TodoItem from './todo-item';

interface TodoListProps {
  projectId: number;
  onAdd: (todo: Todo) => void;
  onItemCheck: (itemId: number, checked: boolean) => void;
  todos: Todo[];
  className?: string;
  canEdit?: boolean;
}

const TodoList: React.FC<TodoListProps> = ({
  className,
  canEdit,
  todos,
  projectId,
  onAdd,
  onItemCheck,
}) => {
  const completed = todos.filter((todo) => todo.completed);
  const incomplete = todos.filter((todo) => !todo.completed);

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-3">Todos</h3>

      {canEdit && <NewTodoForm projectId={projectId} onAdd={onAdd} />}

      <div className="md:grid md:grid-cols-2 md:gap-4">
        <details open>
          <summary className="font-bold italic mb-2 cursor-pointer">
            Incomplete
          </summary>
          <AnimatePresence>
            {incomplete.map((todo) => (
              <TodoItem
                todo={todo}
                key={todo.id}
                onCheck={onItemCheck}
                canEdit={canEdit}
              />
            ))}
          </AnimatePresence>
        </details>

        <details open>
          <summary className="font-bold italic mb-2 cursor-pointer">
            Completed
          </summary>
          <AnimatePresence>
            {completed.map((todo) => (
              <TodoItem
                todo={todo}
                key={todo.id}
                onCheck={onItemCheck}
                canEdit={canEdit}
              />
            ))}
          </AnimatePresence>
        </details>
      </div>
    </div>
  );
};

export default TodoList;
