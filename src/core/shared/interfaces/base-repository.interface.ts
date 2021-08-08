import { BaseEntity, BaseEntityImmutableFields } from "../entities/base-entity.entity";

type GetListOptioins = {
    limit: number;
    offset: number;
};

type ImmutableFields = typeof BaseEntityImmutableFields[number];
export interface BaseRepository<T extends BaseEntity> {
    save(entity: T): Promise<T>;
    update(entityId: T["entityId"], payload: Partial<T>): Promise<T>;
    // update<U extends typeof BaseEntityImmutableFields[number]>(entityId: T["entityId"], payload: Omit<Partial<T>, U>): Promise<T>;
    getById(entityId: T["entityId"]): Promise<T | null>;
    getList<TGetListCondition = any>(cond: TGetListCondition, options: GetListOptioins): Promise<T[]>;
    delete(entityId: T["entityId"]): Promise<void>;
}
