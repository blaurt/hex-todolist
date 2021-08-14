import { inject, injectable } from "inversify";

import { TodoTask,TodoTaskConstructorParams } from "../entities/todo-task.entity";
import { TodoTaskRepository, TodoTaskRepositoryInjectionToken } from "../ports/todo-task.repository";

@injectable()
export class CreateTodoTaskService {
    public constructor(@inject(TodoTaskRepositoryInjectionToken) private readonly repository: TodoTaskRepository) {}

    public async createTodoTask(input: TodoTaskConstructorParams): Promise<TodoTask> {
        const newItem = await this.repository.save(new TodoTask(input));

        return newItem;
    }
}
