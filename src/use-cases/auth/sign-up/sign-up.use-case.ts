import { User } from "src/core/components/user/entities/user.entity";
import { UserRepository } from "src/core/components/user/ports/user.repository";
import { CreateUserService } from "src/core/components/user/services/create-user.service";

import { BaseUseCase } from "../../base.use-case";
import { SignUpValidationSchema } from "./sign-up.validation-schema";

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
        await SignUpValidationSchema.validateAsync({ login, password });
    }

    protected trimResultData(data: User) {
        return;
    }

    protected async handleRequest({ login, password, email }) {
        const user = await this.userService.createUser({ email, login, password });
        // todo send email notif
    }
}
