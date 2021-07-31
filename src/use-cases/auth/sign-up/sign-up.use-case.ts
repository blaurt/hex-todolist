import { inject, injectable } from "inversify";

import { CreateUserService } from "../../../core/components/user/services/create-user.service";
import { BaseUseCase } from "../../base.use-case";
import { SignUpValidationSchema } from "./sign-up.validation-schema";

interface Input {
    login: string;
    password: string;
    repeatPassword: string;
    email: string;
}

@injectable()
export class SignUpUseCase extends BaseUseCase<Input, void> {
    public constructor(@inject(CreateUserService) private readonly userService: CreateUserService) {
        super();
    }

    protected async validate({ login, password, email, repeatPassword }: Input): Promise<void> {
        await SignUpValidationSchema.validateAsync({ login, password, email, repeatPassword }, { abortEarly: false });
    }

    protected trimResultData() {
        return;
    }

    protected async handleRequest({ login, password, email }) {
        const user = await this.userService.createUser({ email, login, password });
        // todo send email notif
    }
}
