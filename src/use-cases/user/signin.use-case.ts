import { User } from "src/core/components/user/entities/user.entity";
import { UserRepository } from "src/core/components/user/ports/user.repository";
import { FindUserService } from "src/core/components/user/services/find-user.service";
import { UserRepositoryPgAdapter } from "src/secondary-adapters/dal/postgres/user/repository/UserRepositoryAdapter";

import { BaseUseCase } from "../base.use-case";

export class SignInUser extends BaseUseCase<User> {
    protected validate(): Promise<void> {
        // todo
        return;
    }

    public repository: UserRepository

    public async execute(login: User["login"]): Promise<User> {
        // todo
        const service = new FindUserService(this.repository);
        const user = await service.findByUsername(login);

        return user;
    }
}
