import { Body, Controller, Injectable, Post } from "@nestjs/common";
import { User } from "src/core/components/user/entities/user.entity";
import { SignInUseCase } from "src/use-cases/user/signin.use-case";
import { SignUpUseCase } from "src/use-cases/user/signup.use-case";

import { ResponseFormat } from "../../response-format.interface";
import { ResponseFormatter } from "../../response-formatters/response-formatter.interface";
import { UserSignUpResponse } from "./responses.dto";

@Controller("v1/users")
export class UserController {
    public constructor(
        private readonly signUpUseCase: SignUpUseCase,
        private readonly signInUseCase: SignInUseCase,
        private readonly responseFormatter: ResponseFormatter,
    ) {}

    @Post("/signup")
    public async signup(@Body() input): Promise<ResponseFormat<UserSignUpResponse>> {
        console.log("🚀 ~ file: user.controller.ts ~ line 13 ~ UserController ~ signup ~ input", input);

        const payload = await this.signUpUseCase.execute(input);

        return this.responseFormatter.format<UserSignUpResponse>(payload);
    }

    @Post("/signin")
    public async signin(@Body() input): Promise<User> {
        const useCase = new SignInUseCase();

        return useCase.execute(input);
    }
}
