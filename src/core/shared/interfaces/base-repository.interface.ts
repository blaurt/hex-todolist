import { BaseEntity, BaseEntityImmutableFields } from "../entities/base-entity.entity";

type GetListOptioins = {
    limit: number;
    offset: number;
};

export interface BaseRepository<T extends BaseEntity, TGetListCondition = any> {
    save(entity: T): Promise<T>;
    update(
        // <U extends typeof BaseEntityImmutableFields[number] = typeof BaseEntityImmutableFields>(
        entityId: T["entityId"],
        payload: Partial<T>,
    ): Promise<T>;
    getById(entityId: T["entityId"]): Promise<T | null>;
    getList(cond: TGetListCondition, options: GetListOptioins): Promise<T[]>;
    delete(entityId: T["entityId"]): Promise<void>;
}
