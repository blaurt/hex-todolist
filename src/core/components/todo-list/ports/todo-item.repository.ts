import { BaseRepository } from "src/core/shared/interfaces/generic-crud.interface";
import { TodoItem } from "../entities/todo-item.entity";

export interface TodoListRepository extends BaseRepository<TodoItem> {
}