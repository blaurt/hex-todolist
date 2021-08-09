import { injectable } from "inversify";
import { TodoItem } from "src/core/components/todo-list/entities/todo-item.entity";
import { EntityMapper } from "src/shared/interfaces/entity-mapper.interface";

import { TodoItemEntity } from "./todo-item.orm-entity";

// todo add builders

@injectable()
export class TodoItemEntityMapper implements EntityMapper<TodoItem, TodoItemEntity> {
    public fromDomainEntity({ createdAt, updatedAt, deletedAt, listId, entityId, ...rest }: TodoItem): TodoItemEntity {
        const list: TodoItemEntity = new TodoItemEntity();
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

    public toDomainEntity({ list_id, entity_id, created_at, updated_at, deleted_at, ...rest }: TodoItemEntity): TodoItem {
        const list: TodoItem = new TodoItem({ entityId: entity_id });
        Object.assign(list, {
            ...rest,
            listId: list_id,
            createdAt: created_at,
            updatedAt: updated_at,
            deletedAt: deleted_at,
        });

        return list;
    }
}
