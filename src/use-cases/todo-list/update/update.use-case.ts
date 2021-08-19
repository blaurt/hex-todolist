import { inject, injectable } from "inversify";
import { pick } from "lodash";
import { TodoList, TodoListPublicFields } from "src/core/components/todo-list/entities/todo-list.entity";
import { FindTodoListsService } from "src/core/components/todo-list/services/find-todo-lists.service";
import { UpdateTodoListService } from "src/core/components/todo-list/services/update-todo-lists.service";
import { AccessDeniedException } from "src/core/shared/exceptions/access-denied.exception";
import { EntityNotFoundException } from "src/core/shared/exceptions/entity-not-found.exception";
import { BaseUseCase, ValidationSchema } from "src/use-cases/base.use-case";

import { UpdateTodoListValidationSchema } from "./update.validation-schema";

interface Input {
    listId: TodoList["entityId"];
    userId: TodoList["userId"];
    title: TodoList["title"];
    description: TodoList["description"];
    isPrivate: TodoList["isPrivate"];
}

type Result = Pick<TodoList, typeof TodoListPublicFields[number]>;

@injectable()
export class UpdateTodoListUseCase extends BaseUseCase<Input, Result> {
    protected validationSchema = UpdateTodoListValidationSchema;

    public constructor(
        @inject(FindTodoListsService) private readonly findTodoListsService: FindTodoListsService,
        @inject(UpdateTodoListService) private readonly updateTodoListService: UpdateTodoListService,
    ) {
        super({ shouldValidate: false, });
    }

    protected trimResultData(data: TodoList) {
        return pick<TodoList, typeof TodoListPublicFields[number]>(data, TodoListPublicFields);
    }

    protected async handleRequest({ listId, userId, }: Input) {
        const list = await this.findTodoListsService.findById(listId);
        if (list.userId !== userId) {
            throw new AccessDeniedException();
        }

        await this.updateTodoListService.updateList(listId, { deletedAt: new Date().toISOString(), });
    }
}
