import { inject, injectable } from "inversify";

import { TodoTask } from "../entities/todo-task.entity";
import { TodoTaskRepository, TodoTaskRepositoryInjectionToken } from "../ports/todo-task.repository";

@injectable()
export class FindTodoTasksService {
    public constructor(@inject(TodoTaskRepositoryInjectionToken) private readonly repository: TodoTaskRepository) {}

    public async findItemsByTodoListId(listId: TodoTask["listId"]): Promise<TodoTask[]> {
        const items = await this.repository.getList({ where: { listId, }, }, { includeDeleted: false, });

        return items;
    }
}
