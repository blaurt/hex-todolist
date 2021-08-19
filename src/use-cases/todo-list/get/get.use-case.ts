import { inject, injectable } from "inversify";
import { pick } from "lodash";
import { TodoList, TodoListPublicFields } from "src/core/components/todo-list/entities/todo-list.entity";
import { FindTodoListsService } from "src/core/components/todo-list/services/find-todo-lists.service";
import { AccessDeniedException } from "src/core/shared/exceptions/access-denied.exception";
import { BaseUseCase, ValidationSchema } from "src/use-cases/base.use-case";

interface Input {
    listId: TodoList["entityId"];
    userId: TodoList["userId"];
}

type Result = Pick<TodoList, typeof TodoListPublicFields[number]>;

@injectable()
export class GetTodoListUseCase extends BaseUseCase<Input, Result> {
    protected validationSchema: null;

    public constructor(@inject(FindTodoListsService) private readonly findTodoListsService: FindTodoListsService) {
        super({ shouldValidate: false, });
    }

    protected async handleRequest({ listId, userId, }: Input) {
        const list = await this.findTodoListsService.findById(listId);
        if (list.userId !== userId) {
            return this.pickPublicData(list);
        }

        return list;
    }

    protected trimResultData(data: TodoList) {
        return pick<TodoList, typeof TodoListPublicFields[number]>(data, TodoListPublicFields);
    }

    private pickPublicData(list: TodoList) {
        const publicItems = list.tasks.map((task) => !task.isPrivate);

        return {
            ...list,
            tasks: publicItems,
        };
    }
}
