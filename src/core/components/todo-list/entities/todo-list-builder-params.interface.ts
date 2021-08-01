import { TodoList } from "./todo-list.entity";

export interface TodoListBuilderParams {
    title: TodoList["title"];
    description: TodoList["description"];
    isPrivate: TodoList["isPrivate"];
}
