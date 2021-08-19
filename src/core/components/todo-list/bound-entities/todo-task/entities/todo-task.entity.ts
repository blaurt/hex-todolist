import { BaseEntity, BaseEntityConstructorParams } from "../../../../../shared/entities/base-entity.entity";
import { TodoList } from "../../../entities/todo-list.entity";

export interface TodoTaskConstructorParams {
    title: TodoTask["title"];
    description: TodoTask["description"];
    isPrivate?: TodoTask["isPrivate"];
    isDone?: TodoTask["isDone"];
    listId: TodoTask["listId"];
}

export class TodoTask extends BaseEntity {
    public title: string;
    public description: string;
    public isDone: boolean;
    public listId: TodoList["entityId"];
    public isPrivate: boolean;

    public constructor({ title, description, isPrivate, isDone, ...baseParams }: TodoTaskConstructorParams & BaseEntityConstructorParams) {
        super(baseParams);
        this.title = title;
        this.description = description;
        this.isPrivate = isPrivate ?? false;
        this.isDone = isDone ?? false;
    }

    get isPublic() {
        return !this.isPrivate;
    }
}
