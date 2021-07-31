import { inject, injectable } from "inversify";

import { DomainBaseException } from "../../../../core/shared/exceptions/app-base.exception";
import { User } from "../entities/user.entity";
import { UserRepository, UserRepositoryInjectionToken } from "../ports/user.repository";

@injectable()
export class FindUserService {
    public constructor(@inject(UserRepositoryInjectionToken) private readonly repository: UserRepository) {}

    public async findByUsername(username: User["login"]): Promise<User> {
        const user = await this.repository.findByUsername(username);
        if (!user) {
            throw new DomainBaseException("Entity not found");
        }

        return user;
    }
}
