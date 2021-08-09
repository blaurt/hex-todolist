import { inject, injectable } from "inversify";

import { TodoItem } from "../entities/todo-item.entity";
import { TodoItemRepository, TodoItemRepositoryInjectionToken } from "../ports/todo-item.repository";

@injectable()
export class UpdateTodoItemService {
    public constructor(@inject(TodoItemRepositoryInjectionToken) private readonly repository: TodoItemRepository) {}

    public async updateTodoItem(entityId: TodoItem["entityId"], payload: Partial<TodoItem>): Promise<TodoItem> {
        return await this.repository.update(entityId, payload);
    }
}
