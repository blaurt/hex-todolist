import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { SignInUseCase } from "src/use-cases/auth/sign-in/sign-in.use-case";
import { SignUpUseCase } from "src/use-cases/auth/sign-up/sign-up.use-case";

import { ResponseFormat } from "../../response-format.interface";
import { ResponseFormatter } from "../../response-formatters/response-formatter.interface";
import { UserSignInResponse } from "./sign-in.response";
import { UserSignUpResponse } from "./sign-up.response";

@Controller("v1/users")
export class UserController {
    public constructor(
        private readonly signUpUseCase: SignUpUseCase,
        private readonly signInUseCase: SignInUseCase,
        private readonly responseFormatter: ResponseFormatter,
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
        const payload = await this.signInUseCase.execute(input);

        return this.responseFormatter.format<UserSignUpResponse>(payload);
    }
}
