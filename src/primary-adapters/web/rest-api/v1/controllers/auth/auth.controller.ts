import { Body, Controller, HttpCode, Post, UseFilters } from "@nestjs/common";

import { SignInUseCase } from "../../../../../../use-cases/auth/sign-in/sign-in.use-case";
import { SignUpUseCase } from "../../../../../../use-cases/auth/sign-up/sign-up.use-case";
import { DomainExceptionsFilter } from "../../exception-filters/domain-exceptions.exception-filter";
import { UserSignInResponse } from "./sign-in.response";

@Controller("v1/auth")
@UseFilters(new DomainExceptionsFilter())
export class AuthController {
    public constructor(private readonly signUpUseCase: SignUpUseCase, private readonly signInUseCase: SignInUseCase) {}

    @Post("/signup")
    public async signup(@Body() input): Promise<void> {
        console.log("🚀 ~ file: user.controller.ts ~ line 13 ~ UserController ~ signup ~ input", input);

        await this.signUpUseCase.execute(input);
    }

    @Post("/signin")
    @HttpCode(200)
    public async signin(@Body() input): Promise<UserSignInResponse> {
        console.log("🚀 ~ file: auth.controller.ts ~ line 1 ~ AuthController ~ signin ~ this.signInUseCase", this.signInUseCase);

        const payload = await this.signInUseCase.execute(input);

        return payload;
    }
}
