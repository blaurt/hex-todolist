import { AppBaseException } from "src/core/shared/exceptions/app-base.exception";
import { User, UserBuilderParams } from "../entities/user.entity";
import { UserRepository } from "../ports/user.repository";

export class CreateUserService {
    public constructor(
        private readonly repository: UserRepository
    ) {}

    public async createUser(input: UserBuilderParams): Promise<User> {
        const existingUser = await this.repository.findByUsername(input.login);

        // todo refactor msg
        if(existingUser) throw new AppBaseException('Username is claimed');

        const newUser = await User.fromInput(input)

        const user = await this.repository.save(newUser);

       
        //todo map to dto or smth
        // return this.userConverter.from(user);
        return user;
    }
}