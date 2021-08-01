// import { injectable } from "inversify";
// import { TodoList } from "src/core/components/todo-list/entities/todo-list.entity";
// import { TodoListRepository } from "src/core/components/todo-list/ports/todo-list.repository";
// import { User } from "src/core/components/user/entities/user.entity";
// import { getRepository, IsNull, Repository } from "typeorm";

// import { BaseTypeOrmRepository } from "../shared/base-typeorm.repository";
// import { TodoListEntity } from "./todo-list.orm-entity";

// @injectable()
// export class TodoListRepositoryPgAdapter extends BaseTypeOrmRepository<TodoList> implements TodoListRepository {
//     private readonly baseRepo: Repository<TodoListEntity>;

//     public constructor() {
//         super(TodoListEntity);
//         this.baseRepo = getRepository(TodoListEntity);
//     }

//     public async getUserLists(userId: User["entityId"], includeDeleted = false): Promise<TodoList[]> {
//         let lists: TodoListEntity[];
//         if (includeDeleted) {
//             lists = await this.baseRepo.find({ user_id: userId });
//         } else {
//             lists = await this.baseRepo.find({ user_id: userId, deleted_at: IsNull() });
//         }

//         return lists.map(TodoListEntity.toDomainEntity);
//     }

//     public async getById(id: TodoList["entityId"]): Promise<TodoList | null> {
//         const ormEntity = await this.baseRepo.findOne({ where: { id } });
//         if (ormEntity) {
//             return TodoListEntity.toDomainEntity(ormEntity);
//         }

//         return null;
//     }

//     public async getList({}, limit?: number, offset?: number): Promise<TodoList[]> {
//         return (await this.baseRepo.find({ skip: offset, take: limit })).map(TodoListEntity.toDomainEntity);
//     }

//     public async save(entity: TodoList): Promise<TodoList> {
//         const mappedData = TodoListEntity.fromDomainObject(entity);
//         const savedEntity = await this.baseRepo.save(mappedData);

//         return TodoListEntity.toDomainEntity(savedEntity);
//     }

//     public async update(entityId: TodoList["entityId"], payload: Omit<Partial<TodoList>, "entityId">): Promise<TodoList> {
//         await this.baseRepo.update(entityId, payload);

//         return this.getById(entityId);
//     }

//     public async delete(entityId: TodoList["entityId"]): Promise<void> {
//         await this.baseRepo.update(entityId, { deleted_at: new Date().toISOString() });
//     }
// }

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
            lists = await this.baseRepo.find({ user_id: userId, deleted_at: IsNull() });
        }

        return lists.map(this.entityMapper.toDomainEntity);
    }

    async test() {
        const res = await this.update("asdf", { isDone: true });
    }
}
