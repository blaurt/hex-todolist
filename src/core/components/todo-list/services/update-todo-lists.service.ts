import { inject, injectable } from "inversify";

import { TodoList } from "../entities/todo-list.entity";
import { TodoListRepository, TodoListRepositoryInjectionToken } from "../ports/todo-list.repository";

@injectable()
export class UpdateTodoListService {
    public constructor(@inject(TodoListRepositoryInjectionToken) private readonly todoListRepository: TodoListRepository) {}

    public async updateList(listId: TodoList["entityId"], payload: Partial<TodoList>): Promise<TodoList> {
        const updatedList = await this.todoListRepository.update(listId, payload);

        return updatedList;
    }
}
