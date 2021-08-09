import { injectable } from "inversify";
import { TodoList } from "src/core/components/todo-list/entities/todo-list.entity";
import { EntityMapper } from "src/shared/interfaces/entity-mapper.interface";

import { TodoListEntity } from "./todo-list.orm-entity";

// todo add builders
// todo add support of items

@injectable()
export class TodoListEntityMapper implements EntityMapper<TodoList, TodoListEntity> {
    public fromDomainEntity({ createdAt, updatedAt, deletedAt, userId, entityId, ...rest }: TodoList): TodoListEntity {
        const list: TodoListEntity = new TodoListEntity();
        Object.assign(list, {
            ...rest,
            user_id: userId,
            entity_id: entityId,
            created_at: createdAt,
            updated_at: updatedAt,
            deleted_at: deletedAt,
        });

        return list;
    }

    public toDomainEntity({ user_id, entity_id, created_at, updated_at, deleted_at, ...rest }: TodoListEntity): TodoList {
        const list: TodoList = new TodoList({ entityId: entity_id });
        Object.assign(list, {
            ...rest,
            userId: user_id,
            createdAt: created_at,
            updatedAt: updated_at,
            deletedAt: deleted_at,
        });

        return list;
    }
}
