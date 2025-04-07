// src/User.ts

import { Todo } from './types';

export class User implements User {
    readonly id: number;
    name: string;
    email?: string;
    private _todos: Todo[] = [];
  
    constructor(id: number, name: string, email?: string) {
      this.id = id;
      this.name = name;
      this.email = email;
    }
  
    get todos(): ReadonlyArray<Todo> {
      return this._todos;
    }
  
    addTodo(todo: Todo): void {
      todo.userId = this.id;
      this._todos.push(todo);
    }
  }
  


  