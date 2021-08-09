import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, Index, PrimaryGeneratedColumn } from "typeorm";

import { BaseEntity } from "../../../../core/shared/entities/base-entity.entity";

export const BaseOrmEntityImmutableFields: Readonly<Array<keyof BaseTypeOrmEntity>> = [
    "entity_id",
    "created_at",
    "updated_at",
    "deleted_at",
] as const;
export abstract class BaseTypeOrmEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Index()
    @Column({ type: "uuid" })
    readonly entity_id: BaseEntity["entityId"];

    @Column()
    created_at: string;

    @Column()
    updated_at: string;

    @Column({ nullable: true })
    deleted_at: string;

    @BeforeInsert()
    beforeCreate() {
        this.created_at = new Date().toISOString();
        this.updated_at = new Date().toISOString();
    }

    @BeforeUpdate()
    beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }

    // todo check if it actually works
    @BeforeRemove()
    beforeRemove() {
        this.deleted_at = new Date().toISOString();
    }
}
