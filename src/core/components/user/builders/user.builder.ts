import { hash } from "bcrypt";
import { injectable } from "inversify";
import { EntityBuilder } from "src/core/shared/interfaces/entity-builder.interface";

import { User } from "../entities/user.entity";
import { UserBuilderParams } from "./user-builder-params.interface";

@injectable()
export class UserBuilder implements EntityBuilder<User> {
    public async fromInput({ email, login, password }: UserBuilderParams): Promise<User> {
        const user = new User();
        user.email = email;
        user.login = login;
        user.passwordHash = await user.generatePasswordHash(password);

        return user;
    }
}

export const UserBuilderInjectionToken = Symbol("UserBuilder");
