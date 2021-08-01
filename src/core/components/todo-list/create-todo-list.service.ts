import { inject } from "inversify";

import { TodoList } from "./entities/todo-list.entity";
import { TodoListRepository } from "./ports/todo-list.repository";

export class CreateTodoListService {
    public constructor(@inject() private readonly todoListRepository: TodoListRepository) {}
    public createList(title: TodoList["title"], items = []) {}
}
