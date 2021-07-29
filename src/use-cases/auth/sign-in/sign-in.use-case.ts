import { pick } from "lodash";
import { User } from "src/core/components/user/entities/user.entity";
import { UserRepository } from "src/core/components/user/ports/user.repository";
import { FindUserService } from "src/core/components/user/services/find-user.service";
import { AppBaseException } from "src/core/shared/exceptions/app-base.exception";

import { BaseUseCase } from "../../base.use-case";
import { SignInValidationSchema } from "./sign-in.validation-schema";

const PublicFields: Readonly<Array<keyof User>> = [
    "email",
    "entityId",
    "login",
] as const;

interface Input {
    login: string;
    password: string;
    email: string;
}

type Result = Pick<User, typeof PublicFields[number]> & { access_token: string };

export class SignInUseCase extends BaseUseCase<Input, Result> {
    private readonly userService: FindUserService;

    public constructor(private readonly repository: UserRepository) {
        super();
        this.userService = new FindUserService(this.repository);
    }

    protected async validate({ login, password }: Pick<User, "login"> & { password: string }): Promise<void> {
        await SignInValidationSchema.validateAsync({ login, password });
    }

    protected async handleRequest({ login, password }) {
        const user = await this.userService.findByUsername(login);
        if (!user) {
            throw new AppBaseException("User not found");
        }

        const isPasswordValid = await user.validatePassword(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new AppBaseException("Invalid password");
        }

        const token = await this.generateToken({ userId: user.entityId });

        return {
            ...user,
            access_token: token
        };
    }

    protected trimResultData(data: User & { access_token: string }): Result {
        return {
            ...pick<User, typeof PublicFields[number]>(data, PublicFields),
            access_token: data.access_token,
        };
    }

    // todo move to separate component
    protected generateToken(payload: Record<string, unknown>) {}
}
