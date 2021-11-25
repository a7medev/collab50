import type { Todo } from '@prisma/client';

import NewTodoForm from './new-todo-form';
import TodoItem from './todo-item';

interface TodoListProps {
  projectId: number;
  onAdd: (todo: Todo) => void;
  onItemCheck: (itemId: number, checked: boolean) => void;
  todos: Todo[];
  className?: string;
}

const TodoList: React.FC<TodoListProps> = ({
  className,
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

      <NewTodoForm projectId={projectId} onAdd={onAdd} />

      <div className="md:grid md:grid-cols-2 md:gap-4">
        <details open>
          <summary className="font-bold italic mb-2 cursor-pointer">
            Incomplete
          </summary>
          {incomplete.map((todo) => (
            <TodoItem todo={todo} key={todo.id} onCheck={onItemCheck} />
          ))}
        </details>

        <details open>
          <summary className="font-bold italic mb-2 cursor-pointer">
            Completed
          </summary>
          {completed.map((todo) => (
            <TodoItem todo={todo} key={todo.id} onCheck={onItemCheck} />
          ))}
        </details>
      </div>
    </div>
  );
};

export default TodoList;
