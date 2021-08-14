import { TodoTask } from "src/core/components/todo-list/bound-entities/todo-task/entities/todo-task.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";

import { BaseTypeOrmEntity } from "../shared/base-typeorm-entity.orm-entity";
import { TodoListEntity } from "../todo-list/todo-list.orm-entity";

@Entity("todo_tasks")
export class TodoTaskEntity extends BaseTypeOrmEntity {
    @Index()
    @Column({ type: "varchar" })
    title: TodoTask["title"];

    @Column({ type: "varchar" })
    description: TodoTask["description"];

    @Column({ type: "boolean" })
    is_done: TodoTask["isDone"];

    @Column({ type: "boolean" })
    is_private: TodoTask["isPrivate"];

    @ManyToOne(() => TodoListEntity)
    @JoinColumn({
        name: "list_id",
        referencedColumnName: "entity_id",
    })
    todo_list: TodoListEntity;

    list_id: TodoTask["listId"];
}
