import { BaseEntity } from "../../../shared/entities/base-entity.entity";

export class TodoItem extends BaseEntity {
    private readonly _isDone: boolean;

    public constructor(private readonly title = "", private readonly description = "", isDone = false, private readonly isPrivate = true) {
        super();
        this._isDone = isDone;
    }

    get isDone() {
        return this._isDone;
    }
}
