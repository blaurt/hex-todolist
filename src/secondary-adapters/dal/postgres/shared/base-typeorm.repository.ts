import { injectable } from "inversify";
import { BaseEntity } from "src/core/shared/entities/base-entity.entity";
import { BaseRepository } from "src/core/shared/interfaces/base-repository.interface";
import { EntityMapper } from "src/shared/interfaces/entity-mapper.interface";
import { ClassType } from "src/shared/types/class-type.type";
import { DeepPartial, FindManyOptions, getRepository, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

import { TodoListEntity } from "../todo-list/todo-list.orm-entity";
import { BaseTypeOrmEntity } from "./base-typeorm-entity.orm-entity";

// const ImmutableFields: Readonly<Array<keyof BaseTypeOrmEntity>> = [
//     "entity_id",
//     "created_at",
//     "updated_at",
//     "deleted_at",
// ] as const;

function createEnum<T extends { [P in keyof T]: P }>(o: T) {
    return o;
}

type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

type x1 = DeepPartial<TodoListEntity>;
type x2 = QueryDeepPartialEntity<TodoListEntity>;

let xx1: x1 = {};
const xx2: x2 = {};
xx1 = xx2;

@injectable()
export abstract class BaseTypeOrmRepository<TDomainEntity extends BaseEntity, TOrmEntity extends BaseTypeOrmEntity>
implements BaseRepository<TDomainEntity, FindManyOptions> {
    protected readonly baseRepo: Repository<TOrmEntity>;
    protected readonly entityMapper: EntityMapper<TDomainEntity, TOrmEntity>;

    public constructor(ormEntityClass: ClassType<TOrmEntity>, entityMapper: EntityMapper<TDomainEntity, TOrmEntity>) {
        this.baseRepo = getRepository(ormEntityClass);
        this.entityMapper = entityMapper;
    }

    // todo Omit ImmutableFields, create type like Omit<Pick<PublicFields>, PrivateFields>
    public async update(entityId: TDomainEntity["entityId"], payload: DeepPartial<TDomainEntity>): Promise<TDomainEntity> {
        await this.baseRepo.update(entityId, payload);

        return this.getById(entityId) as Promise<TDomainEntity>;
    }

    public async getById(entityId: BaseEntity["entityId"]): Promise<TDomainEntity | null> {
        const ormEntity = await this.baseRepo.findOne({ where: { entityId } });
        if (ormEntity) {
            return this.entityMapper.toDomainEntity(ormEntity);
        }

        return null;
    }

    public async getList(cond: FindManyOptions<TDomainEntity>, { limit = 0, offset = 0 }): Promise<TDomainEntity[]> {
        const ormEntities = await this.baseRepo.createQueryBuilder().where(cond)
            .limit(limit)
            .skip(offset)
            .getMany();

        return ormEntities.map(this.entityMapper.toDomainEntity);
    }

    public async save(entity: TDomainEntity): Promise<TDomainEntity> {
        const mappedData = this.entityMapper.fromDomainEntity(entity);
        const savedEntity: TOrmEntity = await this.baseRepo.save(mappedData as unknown as DeepPartial<TOrmEntity>);

        return this.entityMapper.toDomainEntity(savedEntity);
    }

    // // public async update(entityId: TDomainEntity["entityId"], payload: ): Promise<TDomainEntity> {
    // public async update(entityId: TDomainEntity["entityId"], payload): Promise<TDomainEntity> {
    //     await this.baseRepo.update(entityId, payload as QueryDeepPartialEntity<TOrmEntity>);

    //     return this.getById(entityId) as Promise<TDomainEntity>;
    // }

    public async delete(entityId: TDomainEntity["entityId"]): Promise<void> {
        // await this.baseRepo.update(entityId, { deleted_at: new Date().toISOString() });
    }
}
