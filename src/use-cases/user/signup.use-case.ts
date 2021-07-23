import { pick } from "lodash";
import { User } from "src/core/components/user/entities/user.entity";
import { UserRepository } from "src/core/components/user/ports/user.repository";
import { CreateUserService } from "src/core/components/user/services/create-user.service";

import { BaseUseCase, UseCaseProps } from "../base.use-case";

const PublicFields: Readonly<Array<keyof User>> = [
    "email",
    "entityId",
    "login",
] as const;

export class SignUpUserUseCase extends BaseUseCase<User> {
    private readonly userService: CreateUserService;

    public constructor(private readonly repository: UserRepository, props?: UseCaseProps) {
        super(props);
        this.userService = new CreateUserService(this.repository);
    }

    protected validate(): Promise<void> {
        // todo
        return;
    }

    public async execute({ login, password, email }): Promise<typeof PublicFields> {
        const user = await this.userService.createUser({ email, login, password });

        return this.trimResultData(user);
    }

    protected trimResultData(data: User): Partial<typeof PublicFields> {
        return pick(data, PublicFields);
    }
}
