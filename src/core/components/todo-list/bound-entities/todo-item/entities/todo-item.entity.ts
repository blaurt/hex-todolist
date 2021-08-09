import { BaseEntity, BaseEntityConstructorParams } from "../../../../../shared/entities/base-entity.entity";
import { TodoList } from "../../../entities/todo-list.entity";

export interface TodoItemConstructorParams {
    title: TodoItem["title"];
    description: TodoItem["description"];
    isPrivate?: TodoItem["isPrivate"];
    isDone?: TodoItem["isDone"];
    listId: TodoItem["listId"];
}

export class TodoItem extends BaseEntity {
    public title: string;
    public description: string;
    public isDone: boolean;
    public listId: TodoList["entityId"];
    public isPrivate: boolean;

    public constructor({ title, description, isPrivate, isDone, ...baseParams }: TodoItemConstructorParams & BaseEntityConstructorParams) {
        super(baseParams);
        this.title = title;
        this.description = description;
        this.isPrivate = isPrivate ?? false;
        this.isDone = isDone ?? false;
    }
}
