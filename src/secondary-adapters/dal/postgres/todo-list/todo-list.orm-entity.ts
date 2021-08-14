// import { TodoList } from "src/core/components/todo-list/entities/todo-list.entity";
import { TodoList } from "src/core/components/todo-list/entities/todo-list.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";

import { BaseTypeOrmEntity } from "../shared/base-typeorm-entity.orm-entity";
import { UserEntity } from "../user/user.orm-entity";

@Entity({ name: "todo_lists" })
export class TodoListEntity extends BaseTypeOrmEntity {
    @Index()
    @Column({ type: "varchar" })
    title: TodoList["title"];

    @Column({ type: "varchar" })
    description: TodoList["description"];

    @Column({ type: "boolean" })
    is_done: TodoList["isDone"];

    @Column({ type: "boolean" })
    is_private: TodoList["isPrivate"];

    @ManyToOne(() => UserEntity)
    @JoinColumn({
        name: "user_id",
        referencedColumnName: "entity_id",
    })
    user: UserEntity;

    user_id: UserEntity["entity_id"];
}
