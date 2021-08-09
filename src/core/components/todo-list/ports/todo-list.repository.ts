import { User } from "../../../../core/components/user/entities/user.entity";
import { BaseRepository } from "../../../shared/interfaces/base-repository.interface";
import { TodoList } from "../entities/todo-list.entity";

export interface TodoListRepository extends BaseRepository<TodoList> {
    getUserLists(userId: User["entityId"], props?: { includeDeleted?: boolean }): Promise<TodoList[]>;
}

export const TodoListRepositoryInjectionToken = Symbol("TodoListRepository");
