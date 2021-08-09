import { TodoItem } from "../entities/todo-item.entity";
import { TodoList } from "../entities/todo-list.entity";

export interface TodoItemBuilderParams {
    listId: TodoList["entityId"];
    title: TodoItem["title"];
    description: TodoItem["description"];
    isPrivate: TodoItem["isPrivate"];
}
