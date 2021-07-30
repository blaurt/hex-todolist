import { User } from "../../../../core/components/user/entities/user.entity";
import { BaseRepository } from "../../../../core/shared/interfaces/generic-crud.interface";
import { TodoList } from "../entities/todo-list.entity";

export interface TodoListRepository extends BaseRepository<TodoList> {
    getUserLists(userId: User["entityId"]): Promise<TodoList[]>;
}
