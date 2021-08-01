import { BaseEntity } from "src/core/shared/entities/base-entity.entity";
import { BaseTypeOrmEntity } from "src/secondary-adapters/dal/postgres/shared/base-typeorm-entity.orm-entity";

export interface EntityMapper<DomainEntityType extends BaseEntity, OrmEntityType extends BaseTypeOrmEntity> {
    fromDomainEntity(domainEntity: DomainEntityType): OrmEntityType;
    // fromDomainEntity<T extends OrmEntityType>(domainEntity: DomainEntityType): T;
    toDomainEntity(ormEntity: OrmEntityType): DomainEntityType;
}
