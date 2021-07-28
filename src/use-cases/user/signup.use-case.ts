import Joi from "joi";
import { pick } from "lodash";
import { User } from "src/core/components/user/entities/user.entity";
import { UserRepository } from "src/core/components/user/ports/user.repository";
import { CreateUserService } from "src/core/components/user/services/create-user.service";

import { BaseUseCase } from "../base.use-case";

interface Input {
    login: string;
    password: string;
    repeatPassword: string;
    email: string;
}

export class SignUpUseCase extends BaseUseCase<Input, void> {
    private readonly userService: CreateUserService;

    public constructor(private readonly repository: UserRepository) {
        super();
        this.userService = new CreateUserService(this.repository);
    }

    protected async validate({ login, password }: Pick<User, "login"> & { password: string }): Promise<void> {
        const schema = Joi.object({
            login: Joi.string(),
            password: Joi.string(),
            repeatPassword: Joi.string(),
            email: Joi.string().email(),
        });

        try {
            const value = await schema.validateAsync({ login, password });
        } catch (error) {
            console.log("🚀 ~ file: signin.use-case.ts ~ line 36 ~ SignInUser ~ error", error);
        }
    }

    protected async handleRequest({ login, password, email }) {
        const user = await this.userService.createUser({ email, login, password });
        // todo send email notif
    }

    protected trimResultData(data: User) {
        return;
    }
}
