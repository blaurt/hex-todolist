import { inject, injectable } from "inversify";
import { TodoList } from "src/core/components/todo-list/entities/todo-list.entity";
import { FindTodoListsService } from "src/core/components/todo-list/services/find-todo-lists.service";
import { UpdateTodoListService } from "src/core/components/todo-list/services/update-todo-lists.service";
import { AccessDeniedException } from "src/core/shared/exceptions/access-denied.exception";
import { BaseUseCase } from "src/use-cases/base.use-case";

interface Input {
    listId: TodoList["entityId"];
    userId: TodoList["userId"];
}

@injectable()
export class DeleteTodoListUseCase extends BaseUseCase<Input, void> {
    public constructor(
        @inject(FindTodoListsService) private readonly findTodoListsService: FindTodoListsService,
        @inject(UpdateTodoListService) private readonly updateTodoListService: UpdateTodoListService,
    ) {
        super({ shouldValidate: false, });
    }

    protected async handleRequest({ listId, userId, }: Input) {
        const list = await this.findTodoListsService.findById(listId);
        if (list.userId !== userId) {
            throw new AccessDeniedException();
        }

        await this.updateTodoListService.updateList(listId, { deletedAt: new Date().toISOString(), });
    }

    protected trimResultData(): void {
        return;
    }
}
