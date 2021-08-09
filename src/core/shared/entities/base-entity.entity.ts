import { v4 } from "uuid";

export const BaseEntityImmutableFields: Readonly<Array<keyof BaseEntity>> = [
    "entityId",
    "createdAt",
    "updatedAt",
    "deletedAt",
] as const;

export interface BaseEntityConstructorParams {
    entityId?: BaseEntity["entityId"];
    createdAt?: BaseEntity["createdAt"];
    updatedAt?: BaseEntity["updatedAt"];
    deletedAt?: BaseEntity["deletedAt"];
}

export abstract class BaseEntity {
    protected readonly _entityId: string;
    private readonly _createdAt: string;
    private readonly _updatedAt: string;
    private readonly _deletedAt: string | null;

    public constructor({ entityId, createdAt, updatedAt, deletedAt }: BaseEntityConstructorParams = {}) {
        this._entityId = entityId ?? v4();
        const dateNow = new Date().toISOString();
        this._createdAt = createdAt ?? dateNow;
        this._updatedAt = updatedAt ?? dateNow;
        this._deletedAt = deletedAt ?? null;
    }

    get entityId() {
        return this._entityId;
    }

    get createdAt() {
        return this._createdAt;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    get deletedAt() {
        return this._deletedAt;
    }
}
