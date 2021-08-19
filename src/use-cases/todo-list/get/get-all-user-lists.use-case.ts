import { inject, injectable } from "inversify";
import { TodoList } from "src/core/components/todo-list/entities/todo-list.entity";
import { FindTodoListsService } from "src/core/components/todo-list/services/find-todo-lists.service";
import { User } from "src/core/components/user/entities/user.entity";
import { BaseUseCase, ValidationSchema } from "src/use-cases/base.use-case";

interface Input {
    userId: TodoList["userId"];
    requestorId: User["entityId"];
}

@injectable()
export class GetAllUserTodoListsUseCase extends BaseUseCase<Input, TodoList[]> {
    public constructor(@inject(FindTodoListsService) private readonly findTodoListsService: FindTodoListsService) {
        super({ shouldValidate: false, });
    }

    protected validationSchema: ValidationSchema<Input> | null = null;

    protected trimResultData = (data) => data;

    protected async handleRequest({ userId, requestorId, }: Input) {
        const lists = await this.findTodoListsService.findUserLists(userId, false);
        if (userId === requestorId) {
            return lists;
        }

        return lists.map((list) => ({
            tasks: [], // todo use automapper
        }));
    }
}
