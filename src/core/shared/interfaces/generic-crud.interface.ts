import { BaseEntity } from "../entities/BaseEntity.entity";

export interface BaseRepository<T extends BaseEntity> {
    save(entity: T): Promise<T>;
    update(entity: T, payload: Omit<Partial<T>, "entityId">): Promise<T>;
    getById(entityId: T["entityId"]): Promise<T | null>;
    getList(): Promise<T[]>;
    delete(entityId: T["entityId"]): Promise<void>;
}
