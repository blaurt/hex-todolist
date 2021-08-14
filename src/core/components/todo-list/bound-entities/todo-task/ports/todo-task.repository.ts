import { BaseRepository } from "../../../../../shared/interfaces/base-repository.interface";
import { TodoTask } from "../entities/todo-task.entity";

export type TodoTaskRepository = BaseRepository<TodoTask>;

export const TodoTaskRepositoryInjectionToken = Symbol("TodoTaskRepository");
