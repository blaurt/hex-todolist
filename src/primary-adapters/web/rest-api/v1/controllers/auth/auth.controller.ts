import { Body, Controller, HttpCode, HttpStatus, Post, UseFilters } from "@nestjs/common";
import { StatusCodes } from "http-status-codes";

import { SignInUseCase, SignInUseCaseResult } from "../../../../../../use-cases/auth/sign-in/sign-in.use-case";
import { SignUpUseCase, SignUpUseCaseResult } from "../../../../../../use-cases/auth/sign-up/sign-up.use-case";
import { DomainExceptionsFilter } from "../../exception-filters/domain-exceptions.exception-filter";
import { UserSignInResponse } from "./sign-in.response";

@Controller("v1/auth")
@UseFilters(new DomainExceptionsFilter())
export class AuthController {
    public constructor(private readonly signUpUseCase: SignUpUseCase, private readonly signInUseCase: SignInUseCase) {}

    @Post("/signup")
    @HttpCode(StatusCodes.CREATED)
    public async signup(@Body() input): Promise<unknown> {
        const response = await this.signUpUseCase.execute<SignUpUseCaseResult>(input);

        return response;
    }

    @Post("/signin")
    @HttpCode(StatusCodes.OK)
    public async signin(@Body() input): Promise<UserSignInResponse> {
        const payload = await this.signInUseCase.execute<SignInUseCaseResult>(input);

        return payload;
    }
}
