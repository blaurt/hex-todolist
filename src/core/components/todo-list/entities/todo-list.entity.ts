// import { ClientException } from "src/core/shared/exceptions/client.exception";

import { BaseEntity, BaseEntityConstructorParams } from "../../../shared/entities/base-entity.entity";
import { ClientException } from "../../../shared/exceptions/client.exception";
import { User } from "../../user/entities/user.entity";
import { TodoTask } from "../bound-entities/todo-task/entities/todo-task.entity";

export interface TodoListConstructorParams {
    title: TodoList["title"];
    description: TodoList["description"];
    isPrivate?: TodoList["isPrivate"];
    isDone?: TodoList["isDone"];
    userId: TodoList["userId"];
}

export class TodoList extends BaseEntity {
    public title: string;
    public description: string;
    public items: TodoTask[] = [];
    public isDone: boolean;
    public isPrivate: boolean;
    public userId: User["entityId"];

    public constructor({ title, description, userId, isPrivate, isDone, ...baseParams }: TodoListConstructorParams & BaseEntityConstructorParams) {
        super(baseParams);
        this.title = title;
        this.description = description;
        this.isPrivate = isPrivate ?? false;
        this.isDone = isDone ?? false;
        this.userId = userId;
    }

    public markAsDone(): void {
        if (this.items.some((item) => !item.isDone)) {
            throw new ClientException("List contains unfinished items");
        }

        this.isDone = true;
    }
}
