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

function getUserTodos(userId: number): Todo[] {
  return todos.filter((todo) => todo.userId === userId);
}

function parseInput(input: unknown): string {
    if (typeof input === 'string') {
      return input;
    }
  
    if (typeof input === 'number') {
      return input.toString();
    }
  
    return error("Tipo di input non supportato.");
  }
  

// Test
const todo1 = addTodo("Comprare il latte", { priority: "alta", note: "Anche il pane" });
const todo2 = addTodo("Compilare il modulo", "Scadenza entro venerdì");
const todo3 = addTodo("Fare una passeggiata"); // nessun metadata



assignTodoToUser(todo1.id, 101);
assignTodoToUser(todo2.id, 101);
assignTodoToUser(todo3.id, 102);

console.log(todos); 

/* console.log("TODOs per l'utente 101:", getUserTodos(101));
console.log("TODOs per l'utente 102:", getUserTodos(102));

console.log(parseInput("Ciao mondo"));     
console.log(parseInput(123));              
           

/* const importantTodo: TodoWithMetadata = {
    id: 99,
    title: "Preparare la presentazione",
    completed: false,
    metadata: {
      priority: "alta",
      scadenza: "2025-03-31"
    }
  };
  
  console.log("Todo con metadata:", importantTodo); */
  
  