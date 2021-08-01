import { injectable } from "inversify";
import { TodoList } from "src/core/components/todo-list/entities/todo-list.entity";
import { EntityMapper } from "src/shared/interfaces/entity-mapper.interface";

import { TodoListEntity } from "./todo-list.orm-entity";

@injectable()
export class TodoListEntityMapper implements EntityMapper<TodoList, TodoListEntity> {
    public fromDomainEntity(domainEntity: TodoList): TodoListEntity {
        const list: TodoListEntity = new TodoListEntity();
        Object.assign(list, { ...domainEntity, user_id: domainEntity.userId });

        return list;
    }

    public toDomainEntity(ormEntity: TodoListEntity): TodoList {
        const list: TodoList = new TodoList(ormEntity.entity_id);
        Object.assign(list, { ...ormEntity, userId: ormEntity.user_id });

        return list;
    }
}
