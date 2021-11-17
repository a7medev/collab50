import type { Todo } from '@prisma/client';

import NewTodoForm from './new-todo-form';
import TodoItem from './todo-item';

interface TodoListProps {
  projectId: number;
  onAdd: (todo: Todo) => void;
  onItemCheck: (itemId: number, checked: boolean) => void;
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  projectId,
  onAdd,
  onItemCheck,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Todos</h3>

      <NewTodoForm projectId={projectId} onAdd={onAdd} />

      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} onCheck={onItemCheck} />
      ))}
    </div>
  );
};

export default TodoList;
