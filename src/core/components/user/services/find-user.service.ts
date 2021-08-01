import { inject, injectable } from "inversify";
import { EntityNotFoundException } from "src/core/shared/exceptions/entity-not-found.exception";

import { User } from "../entities/user.entity";
import { UserRepository, UserRepositoryInjectionToken } from "../ports/user.repository";

@injectable()
export class FindUserService {
    public constructor(@inject(UserRepositoryInjectionToken) private readonly repository: UserRepository) {}

    public async findByUsername(username: User["login"]): Promise<User> {
        const user = await this.repository.findByUsername(username);
        if (!user) {
            throw new EntityNotFoundException("User was not found");
        }

        return user;
    }
}
