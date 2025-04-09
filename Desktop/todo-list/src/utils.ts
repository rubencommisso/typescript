import { Todo } from './types';

export function filterTodos(todos: Todo[], filterFn: (todo: Todo) => boolean): Todo[] {
  return todos.filter(filterFn);
}
