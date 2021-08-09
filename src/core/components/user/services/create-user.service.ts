import { inject, injectable } from "inversify";

import { UserBuilder, UserBuilderInjectionToken } from "../builders/user.builder";
import { UserBuilderParams } from "../builders/user-builder-params.interface";
import { User } from "../entities/user.entity";
import { DuplicateUserException } from "../exceptions/duplicate-user.exception";
import { UserRepository, UserRepositoryInjectionToken } from "../ports/user.repository";

@injectable()
export class CreateUserService {
    public constructor(
        @inject(UserRepositoryInjectionToken) private readonly repository: UserRepository,
        @inject(UserBuilderInjectionToken) private readonly builder: UserBuilder,
    ) {}

    public async createUser(input: UserBuilderParams): Promise<User> {
        const existingUser = await this.repository.getList({
            where: [
                { login: input.login },
                { email: input.email },
            ],
        });

        // todo refactor msg
        if (existingUser) {
            throw new DuplicateUserException("Username or email is already in use");
        }

        const newUser = await this.builder.fromInput(input);
        console.log("🚀 ~ file: create-user.service.ts ~ line 20 ~ CreateUserService ~ createUser ~ newUser", newUser);

        const user = await this.repository.save(newUser);

        return user;
    }
}
