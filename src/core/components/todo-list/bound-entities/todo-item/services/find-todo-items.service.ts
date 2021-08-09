import { inject, injectable } from "inversify";

import { TodoItem } from "../entities/todo-item.entity";
import { TodoItemRepository, TodoItemRepositoryInjectionToken } from "../ports/todo-item.repository";

@injectable()
export class FindTodoItemsService {
    public constructor(@inject(TodoItemRepositoryInjectionToken) private readonly repository: TodoItemRepository) {}

    public async findItemsByTodoListId(listId: TodoItem["listId"]): Promise<TodoItem[]> {
        const items = await this.repository.getList({ where: { listId } }, { includeDeleted: false });

        return items;
    }
}
