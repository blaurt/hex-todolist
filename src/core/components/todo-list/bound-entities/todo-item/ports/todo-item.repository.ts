import { BaseRepository } from "../../../../../shared/interfaces/base-repository.interface";
import { TodoItem } from "../entities/todo-item.entity";

export type TodoItemRepository = BaseRepository<TodoItem>;

export const TodoItemRepositoryInjectionToken = Symbol("TodoItemRepository");
