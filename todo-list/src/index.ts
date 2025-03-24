import { Todo, User } from './types';

let todos: Todo[] = [];
let nextId = 1;

function error(message: string): never {
  throw new Error(message);
}

function addTodo(title: string): Todo {
  const newTodo: Todo = {
    id: nextId++,
    title: title,
    completed: false,
  };

  todos.push(newTodo);
  return newTodo;
}

function assignTodoToUser(todoId: number, userId: number): void {
  const todo = todos.find((t) => t.id === todoId);
  if (!todo) {
    error(`Todo con ID ${todoId} non trovato.`);
  }
  todo.userId = userId;
}

function getUserTodos(userId: number): Todo[] {
  return todos.filter((todo) => todo.userId === userId);
}

// Test
const todo1 = addTodo("Comprare il latte");
const todo2 = addTodo("Studiare TypeScript");
const todo3 = addTodo("Fare una passeggiata");

assignTodoToUser(999, 105); // <-- questo lancerà un errore
assignTodoToUser(todo1.id, 101);
assignTodoToUser(todo2.id, 101);
assignTodoToUser(todo3.id, 102);


console.log("TODOs per l'utente 101:", getUserTodos(101));
console.log("TODOs per l'utente 102:", getUserTodos(102));

