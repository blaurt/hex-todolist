import { injectable } from "inversify";
import { User } from "src/core/components/user/entities/user.entity";
import { EntityMapper } from "src/shared/interfaces/entity-mapper.interface";

import { UserEntity } from "./user.orm-entity";

@injectable()
export class UserEntityMapper implements EntityMapper<User, UserEntity> {
    public fromDomainEntity(domainEntity: User): UserEntity {
        const ormEntity: UserEntity = new UserEntity();
        Object.assign(ormEntity, {
            ...domainEntity,
            entity_id: domainEntity.entityId,
            password_hash: domainEntity.passwordHash,
        });

        return ormEntity;
    }

    public toDomainEntity(ormEntity: UserEntity): User {
        const user: User = new User({ entityId: ormEntity.entity_id, });
        Object.assign(user, { ...ormEntity, });

        return user;
    }
}
