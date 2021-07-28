import Joi from "joi";
import { pick } from "lodash";
import { User } from "src/core/components/user/entities/user.entity";
import { UserRepository } from "src/core/components/user/ports/user.repository";
import { FindUserService } from "src/core/components/user/services/find-user.service";
import { UserRepositoryPgAdapter } from "src/secondary-adapters/dal/postgres/user/repository/UserRepositoryAdapter";

import { BaseUseCase } from "../base.use-case";

const PublicFields = [
    "email",
    "entityId",
    "login",
] as const;

interface Input {
    login: string;
    password: string;
    email: string;
}

type Result = Pick<User, typeof PublicFields[number]>;

export class SignInUseCase extends BaseUseCase<Input, Result> {
    private readonly userService: FindUserService;

    public constructor(private readonly repository: UserRepository) {
        super();
        this.userService = new FindUserService(this.repository);
    }

    protected async validate({ login, password }: Pick<User, "login"> & { password: string }): Promise<void> {
        const schema = Joi.object({
            login: Joi.string(),
            password: Joi.string(),
        });

        try {
            const value = await schema.validateAsync({ login, password });
        } catch (error) {
            console.log("🚀 ~ file: signin.use-case.ts ~ line 36 ~ SignInUser ~ error", error);
        }
    }

    protected async handleRequest({ login, password, email }): Promise<Pick<User, typeof PublicFields[number]>> {
        const user = await this.userService.findByUsername(login);
        if(!user) {
          throw new AppBaseException('User not found')
        }
        return user;
    }

    protected trimResultData(data: User): Result {
        return pick<User, typeof PublicFields[number]>(data, PublicFields);
    }

    protected public generateToken(){

    }
}
