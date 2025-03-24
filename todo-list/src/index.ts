import { Todo, TodoWithMetadata, User } from './types';

let todos: Todo[] = [];
let nextId = 1;

function error(message: string): never {
  throw new Error(message);
}

function addTodo(title: string, metadata?: string | object): Todo {
    const newTodo: Todo = {
      id: nextId++,
      title: title,
      completed: false,
      metadata: metadata,
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


function updateTodo(todoId: number, updates: Partial<Todo>): void {
    const todo = todos.find((t) => t.id === todoId);
    if (!todo) {
        error(`Todo con ID ${todoId} non trovato.`);
    }
    
    Object.assign(todo, updates);
}





// Test
const todo1 = addTodo("Comprare il latte", { priority: "alta", note: "Anche il pane" });
const todo2 = addTodo("Compilare il modulo", "Scadenza entro venerdì");
const todo3 = addTodo("Fare una passeggiata"); // nessun metadata



assignTodoToUser(todo1.id, 101);
assignTodoToUser(todo2.id, 101);
assignTodoToUser(todo3.id, 102);

console.log(todos); 


updateTodo(todo1.id, { completed: true });
updateTodo(todo2.id, { title: "Compilare il modulo fiscale", metadata: "Urgente" });

console.log("Todos dopo gli aggiornamenti:");
console.log(todos);

