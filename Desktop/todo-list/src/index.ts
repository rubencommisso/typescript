import { Project, Todo, TodoWithMetadata, TodoStatus } from './types';
import { User } from './User'; // ← nuova classe User
import { filterTodos } from './utils';


let todos: Todo[] = [];
let nextId = 1;

function error(message: string): never {
  throw new Error(message);
}

function addTodo(title: string, metadata?: string | object): Todo {
  const newTodo: Todo = {
    id: nextId++,
    title,
    completed: false,
    metadata,
    status: TodoStatus.Pending,
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

  // Se viene aggiornato lo status, aggiorna anche `completed`
  if (updates.status !== undefined) {
    todo.completed = updates.status === TodoStatus.Completed;
  }

  // Oppure, se viene aggiornato `completed`, sincronizza lo `status`
  if (updates.completed !== undefined) {
    if (updates.completed) {
      todo.status = TodoStatus.Completed;
    } else if (todo.status === TodoStatus.Completed) {
      todo.status = TodoStatus.Pending;
    }
  }
}

function getTodoSummary(todo: Todo): [string, boolean] {
  return [todo.title, todo.completed];
}

function createProject(name: string, users: User[], todos: Todo[]): Project {
  return {
    name,
    users,
    todos,
  };
}

function updateTodoStatus(todoId: number, status: TodoStatus): void {
  const todo = todos.find(t => t.id === todoId);
  if (!todo) {
    error(`Todo con ID ${todoId} non trovato.`);
  }

  todo.status = status;
  todo.completed = status === TodoStatus.Completed;
}


// Test
const todo1 = addTodo("Comprare il latte", { priority: "alta", note: "Anche il pane" });
const todo2 = addTodo("Compilare il modulo", "Scadenza entro venerdì");
const todo3 = addTodo("Fare una passeggiata");

// ✅ Crea istanze di User (classe)
const user1 = new User(101, "Mario Rossi", "mario@example.com");
const user2 = new User(102, "Lucia Bianchi");

// ✅ Usa addTodo per assegnare i task
user1.addTodo(todo1);
user1.addTodo(todo2);
user2.addTodo(todo3);

// Puoi evitare assignTodoToUser ora che è fatto dentro addTodo()

updateTodo(todo1.id, { completed: true });
updateTodo(todo2.id, { title: "Compilare il modulo fiscale", metadata: "Urgente", status: TodoStatus.InProgress });

updateTodoStatus(todo3.id, TodoStatus.InProgress);
updateTodoStatus(todo1.id, TodoStatus.Completed);

console.log("Todos dopo gli aggiornamenti:");
console.log(todos);

todos.forEach(todo => {
  const [title, completed] = getTodoSummary(todo);
  console.log(`- ${title} (${completed ? "completato" : "da fare"})`);
});

const project = createProject("Gestione Attività", [user1, user2], todos);

console.log("📁 Progetto creato:", project);

// Todos completati
const completedTodos = filterTodos(todos, todo => todo.completed);
console.log("✅ Todos completati:", completedTodos);

// Todos in stato InProgress
const inProgressTodos = filterTodos(todos, todo => todo.status === TodoStatus.InProgress);
console.log("🔄 Todos in corso:", inProgressTodos);