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


function assignTodoToUser(todoId: number, userId: number): void {
    
    const todo = todos.find((t) => t.id === todoId);
  
    if (todo) {
      todo.userId = userId;
      console.log(`Assegnato todo con ID ${todoId} all'utente con ID ${userId}`);
    } else {
      console.log(`Nessun todo trovato con ID ${todoId}`);
    }
  }