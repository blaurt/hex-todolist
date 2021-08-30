import { inject, injectable } from "inversify";
import { TodoTask } from "src/core/components/todo-list/bound-entities/todo-task/entities/todo-task.entity";
import { TodoTaskRepository } from "src/core/components/todo-list/bound-entities/todo-task/ports/todo-task.repository";

import { BaseTypeOrmRepository } from "../shared/base-typeorm.repository";
import { TodoTaskEntityMapper } from "./todo-task.entity-mapper";
import { TodoTaskEntity } from "./todo-task.orm-entity";

@injectable()
export class TodoTaskRepositoryPgAdapter extends BaseTypeOrmRepository<TodoTask, TodoTaskEntity> implements TodoTaskRepository {
    ormEntityClass = TodoTaskEntity;
    public constructor(@inject(TodoTaskEntityMapper) mapper: TodoTaskEntityMapper) {
        super(TodoTaskEntity, mapper);
    }
}
