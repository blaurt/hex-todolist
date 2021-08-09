import { TodoList } from "src/core/components/todo-list/entities/todo-list.entity";
import { Column, Entity, Index, ManyToOne } from "typeorm";

import { BaseTypeOrmEntity } from "../shared/base-typeorm-entity.orm-entity";
import { UserEntity } from "../user/user.orm-entity";

@Entity("todo_lists")
export class TodoListEntity extends BaseTypeOrmEntity {
    @Index()
    @Column()
    title: TodoList["title"];

    @Column()
    description: TodoList["description"];

    @Column()
    isDone: TodoList["isDone"];

    @Column()
    isPrivate: TodoList["isPrivate"];

    // @Index()
    // @Column()
    // user_id: TodoList["userId"];

    // @ManyToOne(() => User, user => user.photos)

    @ManyToOne(() => UserEntity)
    user: UserEntity;
}
