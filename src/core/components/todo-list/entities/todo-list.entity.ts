import { ClientException } from "src/core/shared/exceptions/client.exception";

import { BaseEntity } from "../../../shared/entities/base-entity.entity";
import { User } from "../../user/entities/user.entity";
import { TodoItem } from "./todo-item.entity";
import { TodoListBuilderParams } from "./todo-list-builder-params.interface";

export class TodoList extends BaseEntity {
    public title: string;
    public description: string;
    public items: TodoItem[];
    public isDone = false;
    public isPrivate = true;
    public userId: User["entityId"];

    public static async fromInput({ title, description, isPrivate }: TodoListBuilderParams): Promise<TodoList> {
        const list = new TodoList();
        list.title = title;
        list.description = description;
        list.isPrivate = isPrivate;

        return list;
    }

    public markAsDone(): void {
        if (this.items.some((item) => !item.isDone)) {
            throw new ClientException("List contains unfinished items");
        }

        this.isDone = true;
    }
}
