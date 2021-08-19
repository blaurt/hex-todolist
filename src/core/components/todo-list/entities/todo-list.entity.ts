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

export const TodoListPublicFields: Readonly<Array<keyof TodoList>> = [
    "title",
    "description",
    "isDone",
    "entityId",
    "tasks",
    "createdAt",
    "updatedAt",
] as const;

export class TodoList extends BaseEntity {
    private _title: string;
    private _description: string;
    private _isDone: boolean;
    private _isPrivate: boolean;
    private _userId: User["entityId"];
    private _tasks: TodoTask[] = [];

    public get isPrivate(): boolean {
        return this._isPrivate;
    }

    get title(): string {
        return this._title;
    }

    get description(): string {
        return this._description;
    }

    get isDone(): boolean {
        return this._isDone;
    }

    get userId() {
        return this._userId;
    }

    public get tasks(): TodoTask[] {
        return this._tasks;
    }

    get isPublic() {
        return !this.isPrivate;
    }

    public constructor({ title, description, userId, isPrivate, isDone, ...baseParams }: TodoListConstructorParams & BaseEntityConstructorParams) {
        super(baseParams);
        this._title = title;
        this._description = description;
        this._isPrivate = isPrivate ?? false;
        this._isDone = isDone ?? false;
        this._userId = userId;
    }

    public markAsDone(): void {
        if (this.tasks.some((item) => !item.isDone)) {
            throw new ClientException("List contains unfinished items");
        }

        this._isDone = true;
    }
}
