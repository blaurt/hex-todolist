import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, PrimaryGeneratedColumn } from "typeorm";

import { BaseEntity } from "../../../../core/shared/entities/BaseEntity.entity";

export abstract class BaseTypeORMEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "uuid" })
    entity_id: BaseEntity["entityId"];

    @Column({ type: "bigint" })
    created_at: number;

    @Column({ type: "bigint" })
    updated_at: number;

    @Column({ type: "bigint", nullable: true })
    deleted_at: number;

    @BeforeInsert()
    beforeCreate() {
        this.created_at = Date.now();
        this.updated_at = Date.now();
    }

    @BeforeUpdate()
    beforeUpdate() {
        this.updated_at = Date.now();
    }

    @BeforeRemove()
    beforeRemove() {
        this.deleted_at = Date.now();
    }
}
