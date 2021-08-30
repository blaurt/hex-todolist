import { inject, injectable } from "inversify";
import { User } from "src/core/components/user/entities/user.entity";
import { JwtService, JwtServiceInjectionToken } from "src/secondary-adapters/services/jwt/jwt-service.interface";

import { CreateUserService } from "../../../core/components/user/services/create-user.service";
import { BaseUseCase } from "../../base.use-case";
import { SignUpValidationSchema } from "./sign-up.validation-schema";

interface Input {
    login: string;
    password: string;
    repeatPassword: string;
    email: string;
}

export interface SignUpUseCaseResult {
    login: User["login"];
    email: User["email"];
    createdAt: User["createdAt"];
    id: User["entityId"];
    accessToken: string;
    refreshToken: string;
}

@injectable()
export class SignUpUseCase extends BaseUseCase<Input, SignUpUseCaseResult> {
    public constructor(
        @inject(CreateUserService) private readonly userService: CreateUserService,
        @inject(JwtServiceInjectionToken) private readonly jwtService: JwtService,
    ) {
        super();
    }

    protected async validate({ login, password, email, repeatPassword, }: Input): Promise<void> {
        await SignUpValidationSchema.validateAsync({ login,
            password,
            email,
            repeatPassword, }, { abortEarly: false, });
    }

    protected async handleRequest({ login, password, email, }): Promise<SignUpUseCaseResult> {
        const user = await this.userService.createUser({ email,
            login,
            password, });
        // todo implement "activate account via email" flow
        // todo send email notif

        const _30minutes = 60 * 30;
        const _1month = 60 * 60 * 24 * 30;

        const accessToken = await this.jwtService.sign(
            {
                id: user.entityId,
                email: user.email,
                login: user.login,
                createdAt: user.createdAt,
            },
            _30minutes,
        );

        const refreshToken = await this.jwtService.sign({ userId: user.entityId, }, _1month);
        console.log("🚀 ~ file: sign-up.use-case.ts ~ line 95 ~ SignUpUseCase ~ handleRequest ~ user11111111111", user.entityId);

        return {
            id: user.entityId,
            email: user.email,
            login: user.login,
            createdAt: user.createdAt,
            accessToken,
            refreshToken,
        };
    }
}
