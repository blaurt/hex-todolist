import { Body, Controller, HttpCode, Inject, Post, UseFilters } from "@nestjs/common";

import { SignInUseCase } from "../../../../../../use-cases/auth/sign-in/sign-in.use-case";
import { SignUpUseCase } from "../../../../../../use-cases/auth/sign-up/sign-up.use-case";
import { DomainExceptionsFilter } from "../../all-exceptions.exception-filter";
import { ResponseFormat } from "../../response-format.interface";
import { ResponseFormatter, ResponseFormatterInjectionToken } from "../../utils/response-formatters/response-formatter.interface";
import { UserSignInResponse } from "./sign-in.response";
import { UserSignUpResponse } from "./sign-up.response";

@Controller("v1/auth")
@UseFilters(new DomainExceptionsFilter())
export class AuthController {
    public constructor(
        private readonly signUpUseCase: SignUpUseCase,
        private readonly signInUseCase: SignInUseCase,
        @Inject(ResponseFormatterInjectionToken) private readonly responseFormatter: ResponseFormatter,
    ) {}

    @Post("/signup")
    public async signup(@Body() input): Promise<void> {
        console.log("🚀 ~ file: user.controller.ts ~ line 13 ~ UserController ~ signup ~ input", input);

        await this.signUpUseCase.execute(input);

        return;
    }

    @Post("/signin")
    @HttpCode(200)
    public async signin(@Body() input): Promise<ResponseFormat<UserSignInResponse>> {
        console.log("🚀 ~ file: auth.controller.ts ~ line 1 ~ AuthController ~ signin ~ this.signInUseCase", this.signInUseCase);

        const payload = await this.signInUseCase.execute(input);

        return this.responseFormatter.format<UserSignUpResponse>(payload);
    }
}
