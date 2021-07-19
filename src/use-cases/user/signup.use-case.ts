import { User } from "src/core/components/user/entities/user.entity";
import { UserRepository } from "src/core/components/user/ports/user.repository";
import { CreateUserService } from "src/core/components/user/services/create-user.service";
import { UserRepositoryPgAdapter } from "src/secondary-adapters/dal/postgres/user/repository/UserRepositoryAdapter";

import { BaseUseCase } from "../base.use-case";

export class SignUpUser extends BaseUseCase<User> {
    protected validate(): Promise<void> {
        // todo
        return;
    }

    public repository: UserRepository;

    public async execute({ login, password, email }): Promise<User> {
        // todo
        const service = new CreateUserService(this.repository);
        const user = await service.createUser({ email, login, password });

        return user;
    }
}
