import { inject, injectable } from "inversify";

import { TodoTask } from "../entities/todo-task.entity";
import { TodoTaskRepository, TodoTaskRepositoryInjectionToken } from "../ports/todo-task.repository";

@injectable()
export class UpdateTodoTaskService {
    public constructor(@inject(TodoTaskRepositoryInjectionToken) private readonly repository: TodoTaskRepository) {}

    public async updateTodoTask(entityId: TodoTask["entityId"], payload: Partial<TodoTask>): Promise<TodoTask> {
        return await this.repository.update(entityId, payload);
    }
}
