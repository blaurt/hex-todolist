import { inject, injectable } from "inversify";
import { EntityBuilder } from "src/core/shared/interfaces/entity-builder.interface";

import { TodoList } from "../entities/todo-list.entity";
import { TodoItemBuilder, TodoItemBuilderInjectionToken } from "./todo-item.builder";
import { TodoListBuilderParams } from "./todo-list-builder-params.interface";

@injectable()
export class TodoListBuilder implements EntityBuilder<TodoList> {
    public constructor(@inject(TodoItemBuilderInjectionToken) private readonly todoItemBuilder: TodoItemBuilder) {}

    public async fromInput({ title, description, isPrivate, userId, items = [] }: TodoListBuilderParams): Promise<TodoList> {
        const todoList = new TodoList();
        todoList.title = title;
        todoList.description = description;
        todoList.isPrivate = isPrivate;
        todoList.userId = userId;
        if (items.length > 0) {
            todoList.items = await Promise.all(items.map((itemData) => this.todoItemBuilder.fromInput(itemData)));
        }

        return todoList;
    }
}

export const TodoListBuilderInjectionToken = Symbol("TodoListBuilder");
