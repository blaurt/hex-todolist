import { injectable } from "inversify";
import { TodoTask } from "src/core/components/todo-list/bound-entities/todo-task/entities/todo-task.entity";
import { EntityMapper } from "src/shared/interfaces/entity-mapper.interface";

import { TodoTaskEntity } from "./todo-item.orm-entity";

// todo add builders

@injectable()
export class TodoTaskEntityMapper implements EntityMapper<TodoTask, TodoTaskEntity> {
    public fromDomainEntity({ createdAt, updatedAt, deletedAt, listId, entityId, ...rest }: TodoTask): TodoTaskEntity {
        const list: TodoTaskEntity = new TodoTaskEntity();
        Object.assign(list, {
            ...rest,
            list_id: listId,
            entity_id: entityId,
            created_at: createdAt,
            updated_at: updatedAt,
            deleted_at: deletedAt,
        });

        return list;
    }

    public toDomainEntity({ list_id, entity_id, created_at, updated_at, deleted_at, ...rest }: TodoTaskEntity): TodoTask {
        const list: TodoTask = new TodoTask({
            entityId: entity_id,
            listId: list_id,

            ...rest,
        });

        return list;
    }
}
