import { Column, Entity } from "typeorm";

import { User } from "../../../../../core/components/user/entities/user.entity";
import { BaseTypeORMEntity } from "../../shared/BaseTypeORMEntity";

@Entity({ name: "users" })
export class UserEntity extends BaseTypeORMEntity {
    @Column({ name: "email" })
    readonly email: string;

    @Column()
    readonly password_hash: string;

    @Column({ name: "login" })
    readonly login: string;

    public static fromDomainObject(domainEntity: User): UserEntity {
        const user: UserEntity = new UserEntity();
        Object.assign(user, { ...domainEntity, password_hash: domainEntity.passwordHash, entity_id: domainEntity.entityId });

        return user;
    }

    public static toDomainObject(ormEntity: UserEntity): User {
        const user = new User(ormEntity.entity_id);
        Object.assign(user, { ...ormEntity, passwordHash: ormEntity.password_hash });

        return user;
    }
}
