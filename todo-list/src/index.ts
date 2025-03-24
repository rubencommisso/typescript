import { Todo } from './types';

let todos: Todo[] = [];
let nextId = 1; 

function addTodo(title: string): Todo {
  const newTodo: Todo = {
    id: nextId++,
    title: title,
    completed: false,
  };

  todos.push(newTodo);
  return newTodo;
}

