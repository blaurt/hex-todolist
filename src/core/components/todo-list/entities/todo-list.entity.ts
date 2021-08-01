import { BaseEntity } from "../../../shared/entities/BaseEntity.entity";
import { DomainBaseException } from "../../../shared/exceptions/domain-base.exception";
import { TodoItem } from "./todo-item.entity";

export class TodoList extends BaseEntity {
    public constructor(private title = "", private description = "", private items: TodoItem[], private isDone = false, private isPrivate = true) {
        super();
    }

    public markAsDone(): void {
        if (this.items.some((item) => !item.isDone))
            throw new DomainBaseException("List contains unfinished items");

        this.isDone = true;
    }
}
