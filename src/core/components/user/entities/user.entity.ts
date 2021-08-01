import { compare, hash } from "bcrypt";

import { BaseEntity, BaseEntityConstructorProps } from "../../../shared/entities/base-entity.entity";
import { UserBuilderParams } from "./user-builder.params.interface";

// todo replace with adv encryptor
const ROUNDS = 10 as const;

export class User extends BaseEntity {
    public login: string;
    public email: string;
    public passwordHash: string;

    public static async fromInput({ email, login, password }: UserBuilderParams): Promise<User> {
        const user = new User();
        user.email = email;
        user.login = login;
        user.passwordHash = await hash(password, ROUNDS);

        return user;
    }

    public async validatePassword(input: string, passwordHash: string): Promise<boolean> {
        return compare(input, passwordHash);
    }
}
