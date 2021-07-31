import { inject, injectable } from "inversify";

import { DomainBaseException } from "../../../../core/shared/exceptions/app-base.exception";
import { User, UserBuilderParams } from "../entities/user.entity";
import { UserRepository, UserRepositoryInjectionToken } from "../ports/user.repository";

@injectable()
export class CreateUserService {
    public constructor(@inject(UserRepositoryInjectionToken) private readonly repository: UserRepository) {}

    public async createUser(input: UserBuilderParams): Promise<User> {
        const existingUser = await this.repository.findByUsername(input.login);

        // todo refactor msg
        if (existingUser) {
            throw new DomainBaseException("Username is claimed");
        }

        const newUser = await User.fromInput(input);
        console.log("🚀 ~ file: create-user.service.ts ~ line 20 ~ CreateUserService ~ createUser ~ newUser", newUser);

        const user = await this.repository.save(newUser);

        // todo map to dto or smth
        // return this.userConverter.from(user);
        return user;
    }
}
