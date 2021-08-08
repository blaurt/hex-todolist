import { inject, injectable } from "inversify";
import { TodoList } from "src/core/components/todo-list/entities/todo-list.entity";
import { TodoListRepository } from "src/core/components/todo-list/ports/todo-list.repository";
import { User } from "src/core/components/user/entities/user.entity";
import { IsNull } from "typeorm";

import { BaseTypeOrmRepository } from "../shared/base-typeorm.repository";
import { TodoListEntityMapper } from "./todo-list.entity-mapper";
import { TodoListEntity } from "./todo-list.orm-entity";

@injectable()
export class TodoListRepositoryPgAdapter extends BaseTypeOrmRepository<TodoList, TodoListEntity> implements TodoListRepository {
    public constructor(@inject(TodoListEntityMapper) mapper: TodoListEntityMapper) {
        super(TodoListEntity, mapper);
    }

    public async getUserLists(userId: User["entityId"], includeDeleted = false): Promise<TodoList[]> {
        let lists: TodoListEntity[];
        if (includeDeleted) {
            lists = await this.baseRepo.find({ user_id: userId });
        } else {
            lists = await this.baseRepo.find({
                user_id: userId,
                deleted_at: IsNull(),
            });
        }

        return lists.map(this.entityMapper.toDomainEntity);
    }
}
