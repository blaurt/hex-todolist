import { inject, injectable } from "inversify";
import { TodoItem } from "src/core/components/todo-list/entities/todo-item.entity";
import { TodoItemRepository } from "src/core/components/todo-list/bound-entities/todo-item/ports/todo-item.repository";

import { BaseTypeOrmRepository } from "../shared/base-typeorm.repository";
import { TodoItemEntity } from "./todo-item.orm-entity";
import { TodoItemEntityMapper } from "./todo-item.entity-mapper";

@injectable()
export class TodoItemRepositoryPgAdapter extends BaseTypeOrmRepository<TodoItem, TodoItemEntity> implements TodoItemRepository {
    public constructor(@inject(TodoItemEntityMapper) mapper: TodoItemEntityMapper) {
        super(TodoItemEntity, mapper);
    }
}
