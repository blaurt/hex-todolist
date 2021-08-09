import { injectable } from "inversify";
import { EntityBuilder } from "src/core/shared/interfaces/entity-builder.interface";

import { TodoItem } from "../entities/todo-item.entity";
import { TodoItemBuilderParams } from "./todo-item-builder-params.interface";

@injectable()
export class TodoItemBuilder implements EntityBuilder<TodoItem> {
    public async fromInput({ title, description, isPrivate, listId }: TodoItemBuilderParams): Promise<TodoItem> {
        const todoItem = new TodoItem();
        todoItem.title = title;
        todoItem.description = description;
        todoItem.isPrivate = isPrivate;
        todoItem.listId = listId;

        return todoItem;
    }
}

export const TodoItemBuilderInjectionToken = Symbol("TodoItemBuilder");
