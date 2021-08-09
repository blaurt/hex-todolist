import { inject, injectable } from "inversify";

import { TodoItem, TodoItemConstructorParams } from "../entities/todo-item.entity";
import { TodoItemRepository, TodoItemRepositoryInjectionToken } from "../ports/todo-item.repository";

@injectable()
export class CreateTodoItemService {
    public constructor(@inject(TodoItemRepositoryInjectionToken) private readonly repository: TodoItemRepository) {}

    public async createTodoItem(input: TodoItemConstructorParams): Promise<TodoItem> {
        const newItem = await this.repository.save(new TodoItem(input));

        return newItem;
    }
}
