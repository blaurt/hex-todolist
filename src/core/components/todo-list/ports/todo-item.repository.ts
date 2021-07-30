import { BaseRepository } from "../../../shared/interfaces/generic-crud.interface";
import { TodoItem } from "../entities/todo-item.entity";

export type TodoListRepository = BaseRepository<TodoItem>;
