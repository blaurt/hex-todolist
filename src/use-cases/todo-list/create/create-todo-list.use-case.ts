import { inject, injectable } from "inversify";
import { pick } from "lodash";
import { TodoList, TodoListPublicFields } from "src/core/components/todo-list/entities/todo-list.entity";
import { CreateTodoListService } from "src/core/components/todo-list/services/create-todo-list.service";
import { BaseUseCase, ValidationSchema } from "src/use-cases/base.use-case";

import { CreateTodoListValidationSchema } from "./create-todo-list.validation-schema";

interface Input {
    title: string;
    description: string;
    isPrivate: boolean;
    userId: string;
}

// todo dto
type Result = Pick<TodoList, typeof TodoListPublicFields[number]>;

@injectable()
export class CreateTodoListUseCase extends BaseUseCase<Input, Result> {
    protected validationSchema: ValidationSchema<Input> = CreateTodoListValidationSchema;
    public constructor(@inject(CreateTodoListService) private readonly service: CreateTodoListService) {
        super();
    }

    protected trimResultData(data: TodoList): Result {
        return pick<TodoList, typeof TodoListPublicFields[number]>(data, TodoListPublicFields);
    }

    protected async handleRequest(payload: Input) {
        const newList = await this.service.createList({ ...payload, });

        return newList;
    }
}
