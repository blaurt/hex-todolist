import { inject, injectable } from "inversify";
import { JwtService, JwtServiceInjectionToken } from "src/secondary-adapters/services/jwt/jwt-service.interface";

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

    public async createUser({ email, login, password, }: UserBuilderParams): Promise<User> {
        const doesUserExist = await this.checkIfCredentialsClaimed(login, email);

        // todo refactor msg
        if (doesUserExist) {
            throw new DuplicateUserException("Username or email is already in use");
        }

        const newUser = await this.builder.fromInput({
            email,
            login,
            password,
        });

        const user = await this.repository.save(newUser);

        return user;
    }

    private async checkIfCredentialsClaimed(login: User["login"], email: User["email"]): Promise<boolean> {
        const results = await this.repository.getList({
            where: [
                { login, },
                { email, },
            ],
        });

        return results.length > 0;
    }
}
