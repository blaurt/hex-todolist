import { User } from "src/core/components/user/entities/user.entity";
import { FindUserService } from "src/core/components/user/services/find-user.service";
import { UserRepositoryPgAdapter } from "src/secondary-adapters/dal/postgres/user/repository/UserRepositoryAdapter";
import { BaseUseCase } from "../base.use-case";

export class SignInUser extends BaseUseCase<User>{
    protected validate(): Promise<void> {
        //todo
        return;
    }

    public async execute(login: User['login']): Promise<User> {
        //todo
        const rep = new UserRepositoryPgAdapter();
        const service = new FindUserService(rep);
        const user = await service.findByUsername(login);
        return user;
    }

};