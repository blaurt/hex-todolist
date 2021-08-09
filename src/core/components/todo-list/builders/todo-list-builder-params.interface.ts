import { TodoItem } from "../entities/todo-item.entity";
import { TodoList } from "../entities/todo-list.entity";

export interface TodoListBuilderParams {
    title: TodoList["title"];
    description: TodoList["description"];
    isPrivate: TodoList["isPrivate"];
    userId: TodoList["userId"];
    items?: TodoItem[];
}
