import { string } from "joi";
import { TodoItem } from "src/core/components/todo-list/bound-entities/todo-item/entities/todo-item.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";

import { BaseTypeOrmEntity } from "../shared/base-typeorm-entity.orm-entity";
import { TodoListEntity } from "../todo-list/todo-list.orm-entity";

@Entity("todo_items")
export class TodoItemEntity extends BaseTypeOrmEntity {
    @Index()
    @Column({ type: "varchar" })
    title: TodoItem["title"];

    @Column({ type: "varchar" })
    description: TodoItem["description"];

    @Column({ type: "varchar" })
    list_id: TodoItem["listId"];

    @Column({ type: "boolean" })
    is_done: TodoItem["isDone"];

    @Column({ type: "boolean" })
    is_private: TodoItem["isPrivate"];

    @ManyToOne(() => TodoListEntity)
    @JoinColumn({
        name: "list_id",
        referencedColumnName: "entity_id",
    })
    todo_list: TodoListEntity;
}
}
