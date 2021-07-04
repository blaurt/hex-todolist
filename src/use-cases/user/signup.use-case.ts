import { User } from "src/core/components/user/entities/user.entity";
import { CreateUserService } from "src/core/components/user/services/create-user.service";
import { UserRepositoryPgAdapter } from "src/secondary-adapters/dal/postgres/user/repository/UserRepositoryAdapter";
import { BaseUseCase } from "../base.use-case";

export class SignUpUser extends BaseUseCase<User>{
    protected validate(): Promise<void> {
        //todo
        return;
    }

    public async execute({login, password, email}): Promise<User> {
        //todo
        const rep = new UserRepositoryPgAdapter();
        const service = new CreateUserService(rep);
        const user = await service.createUser({email,login,password});
        return user;
    }

}