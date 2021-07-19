import { hash } from "bcrypt";

import { BaseEntity } from "../../../shared/entities/BaseEntity.entity";

// todo replace with adv encryptor
const ROUNDS = 10 as const;

export interface UserBuilderParams {
    login: User["login"],
    email: User["email"],
    password: string,
}

export class User extends BaseEntity {
    public login: string;
    public email: string;
    public passwordHash: string;

    public constructor(entityId?: BaseEntity["entityId"]) {
        super(entityId);
    }

    public async validatePassword(input: string, passwordHash: string): Promise<boolean> {
        // todo implement
        return true;
    }

    public static async fromInput({ email, login, password }: UserBuilderParams): Promise<User> {
        const user = new User();
        user.email = email;
        user.login = login;
        user.passwordHash = await hash(password, ROUNDS);

        return user;
    }
}
