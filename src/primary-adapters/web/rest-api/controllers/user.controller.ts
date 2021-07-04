import { Body, Controller, Injectable, Post } from "@nestjs/common";
import { User } from "src/core/components/user/entities/user.entity";
 import { SignInUser } from "src/use-cases/user/signin.use-case";
 import { SignUpUser} from "src/use-cases/user/signup.use-case";

@Injectable()
@Controller('users')
export class UserController {
    public constructor(){

    }

    @Post('/signup')
    public async signup(@Body() input): Promise<User> {
        const service = new SignUpUser();
        return service.execute(input);
    }

    @Post('/signin')
    public async signin(@Body() input): Promise<User> {
        const useCase = new SignInUser();
        return useCase.execute(input);

    }
}