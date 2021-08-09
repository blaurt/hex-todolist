import { inject, injectable } from "inversify";
import { pick } from "lodash";
import { CreateTodoListService } from "src/core/components/todo-list/create-todo-list.service";
import { TodoList } from "src/core/components/todo-list/entities/todo-list.entity";
import { BaseUseCase, ValidationSchema } from "src/use-cases/base.use-case";

import { CreateTodoListValidationSchema } from "./create.validation-schema";

const PublicFields: Readonly<Array<keyof TodoList>> = [
    "title",
    "description",
    "isDone",
    "entityId",
    "items",
    "createdAt",
    "updatedAt",
] as const;

interface Input {
    title: string;
    description: string;
    isPrivate: string;
}

type Result = Pick<TodoList, typeof PublicFields[number]>;

@injectable()
export class CreateTodoListUseCase extends BaseUseCase<Input, Result> {
    protected validationSchema: ValidationSchema<Input> = CreateTodoListValidationSchema;
    public constructor(@inject(CreateTodoListService) private readonly service: CreateTodoListService) {
        super();
    }

    protected trimResultData(data: TodoList): Result {
        return {
            ...pick<TodoList, typeof PublicFields[number]>(data, PublicFields),
        };
    }

    protected async handleRequest(payload: unknown) {
        const user = await this.service.createList({});
        if (!user) {
            throw new DomainBaseException("User not found");
        }

        const isPasswordValid = await user.validatePassword(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new DomainBaseException("Invalid password");
        }

        const token = await this.jwtService.sign({ userId: user.entityId });

        return {
            ...user,
            access_token: token,
        };
    }

    protected async validate(data: Input): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
