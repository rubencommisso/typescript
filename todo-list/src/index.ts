import { Project, Todo, TodoWithMetadata, User } from './types';

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

function getTodoSummary(todo: Todo): [string, boolean] {
    return [todo.title, todo.completed];
  }
  

  function createProject(name: string, users: User[], todos: Todo[]): Project {
    return {
      name,
      users,
      todos
    };
  }
  




// Test
const todo1 = addTodo("Comprare il latte", { priority: "alta", note: "Anche il pane" });
const todo2 = addTodo("Compilare il modulo", "Scadenza entro venerdì");
const todo3 = addTodo("Fare una passeggiata");

assignTodoToUser(todo1.id, 101);
assignTodoToUser(todo2.id, 101);
assignTodoToUser(todo3.id, 102);

updateTodo(todo1.id, { completed: true });
updateTodo(todo2.id, { title: "Compilare il modulo fiscale", metadata: "Urgente" });

console.log("Todos dopo gli aggiornamenti:");
console.log(todos);


todos.forEach(todo => {
  const [title, completed] = getTodoSummary(todo);
  console.log(`- ${title} (${completed ? "completato" : "da fare"})`);
});


const user1: User = { id: 101, name: "Mario Rossi", todos: [todo1, todo2] };
const user2: User = { id: 102, name: "Lucia Bianchi", todos: [todo3] };

const project = createProject("Gestione Attività", [user1, user2], todos);

console.log("📁 Progetto creato:", project);
