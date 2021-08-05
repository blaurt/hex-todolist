import { injectable } from "inversify";
import { TodoList } from "src/core/components/todo-list/entities/todo-list.entity";
import { BaseEntity, BaseEntityImmutableFields } from "src/core/shared/entities/base-entity.entity";
import { BaseRepository } from "src/core/shared/interfaces/base-repository.interface";
import { EntityMapper } from "src/shared/interfaces/entity-mapper.interface";
import { ClassType } from "src/shared/types/class-type.type";
import { DeepPartial, FindManyOptions, getRepository, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

import { BaseTypeOrmEntity } from "./base-typeorm-entity.orm-entity";

const ImmutableFields = [
    ...BaseEntityImmutableFields,
    ...BaseOrmEntityImmutableFields,
];

type UpdatableFields<TDomainEntity> = Omit<Partial<TDomainEntity>, typeof ImmutableFields[number]>;
// type UpdatableFields<TDomainEntity> = Omit<Omit<Partial<TDomainEntity>, typeof ImmutableFields[number]>, typeof BaseEntityImmutableFields[number]>;
const x: UpdatableFields<TodoList> = {
    isDone: true,
    // deleted_at: "asdf",
    deletedAt: "asdf",
};
@injectable()
export abstract class BaseTypeOrmRepository<TDomainEntity extends BaseEntity, TOrmEntity extends BaseTypeOrmEntity>
implements BaseRepository<TDomainEntity> {
    protected readonly baseRepo: Repository<TOrmEntity>;
    protected readonly entityMapper: EntityMapper<TDomainEntity, TOrmEntity>;

    public constructor(ormEntityClass: ClassType<TOrmEntity>, entityMapper: EntityMapper<TDomainEntity, TOrmEntity>) {
        this.baseRepo = getRepository(ormEntityClass);
        this.entityMapper = entityMapper;
    }

    public async update(entityId: TDomainEntity["entityId"], payload: UpdatableFields<TDomainEntity>): Promise<TDomainEntity> {
        const normalizedPayload = await this.baseRepo.update(entityId, payload as unknown as QueryDeepPartialEntity<TOrmEntity>);

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
