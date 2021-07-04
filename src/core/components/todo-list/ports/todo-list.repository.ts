import { User } from "src/core/components/user/entities/user.entity";
import { BaseRepository } from "src/core/shared/interfaces/generic-crud.interface";
import { TodoList } from "../entities/todo-list.entity";

export interface TodoListRepository extends BaseRepository<TodoList> {
    getUserLists(userId: User['entityId']): Promise<TodoList[]>;
}