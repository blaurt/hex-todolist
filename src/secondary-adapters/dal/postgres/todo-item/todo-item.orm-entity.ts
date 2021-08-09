import { TodoItem } from "src/core/components/todo-list/bound-entities/todo-item/entities/todo-item.entity";
import { Column, Entity, Index } from "typeorm";

import { BaseTypeOrmEntity } from "../shared/base-typeorm-entity.orm-entity";

@Entity("todo_lists")
export class TodoItemEntity extends BaseTypeOrmEntity {
    @Index()
    @Column()
    title: TodoItem["title"];

    @Column()
    description: TodoItem["description"];

    @Column()
    list_id: TodoItem["listId"];

    @Column()
    isDone: TodoItem["isDone"];

    @Column()
    isPrivate: TodoItem["isPrivate"];
}
