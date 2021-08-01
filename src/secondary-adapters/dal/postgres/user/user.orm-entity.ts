import { User } from "src/core/components/user/entities/user.entity";
import { Column, Entity, Index } from "typeorm";

import { BaseTypeOrmEntity } from "../shared/base-typeorm-entity.orm-entity";

@Entity({ name: "users" })
export class UserEntity extends BaseTypeOrmEntity {
    @Index()
    @Column({ unique: true })
    readonly email: string;

    @Index()
    @Column({ unique: true })
    readonly login: string;

    @Column()
    readonly password_hash: string;

    public static fromDomainObject(domainEntity: User): UserEntity {
        const user: UserEntity = new UserEntity();
        Object.assign(user, { ...domainEntity, password_hash: domainEntity.passwordHash, entity_id: domainEntity.entityId });

        return user;
    }

    public static toDomainEntity(ormEntity: UserEntity): User {
        const user = new User(ormEntity.entity_id);
        Object.assign(user, { ...ormEntity, passwordHash: ormEntity.password_hash });

        return user;
    }
}
