// src/types.ts

export enum TodoStatus {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Completed = 'Completed',
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId?: number;
  metadata?: any;
  status: TodoStatus; // ← nuova proprietà
}

export interface TodoWithMetadata extends Todo {
  metadata: any;
}

export interface User {
  id: number;
  name: string;
  email?: string;
  readonly todos: ReadonlyArray<Todo>;
}

export interface Project {
  name: string;
  users: User[];
  todos: Todo[];
}

export type PartialTodo = Partial<Todo>;

