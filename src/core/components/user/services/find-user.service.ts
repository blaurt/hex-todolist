import { AppBaseException } from "src/core/shared/exceptions/app-base.exception";
import { User } from "../entities/user.entity";
import { UserRepository } from "../ports/user.repository";

export class FindUserService {
    public constructor(
        private readonly repository: UserRepository
    ){}

    public async findByUsername(username: User['login']): Promise<User> {
        const user = await this.repository.findByUsername(username);
        if(!user) {
            throw new AppBaseException('Entity not found')
        }

        return user;
    }
}