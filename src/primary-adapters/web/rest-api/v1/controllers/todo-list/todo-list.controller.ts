import { Controller, Get, Query, UseFilters } from "@nestjs/common";
import { CreateTodoListUseCase } from "src/use-cases/todo-list/create/create-todo-list.use-case";
import { DeleteTodoListUseCase } from "src/use-cases/todo-list/delete/delete-todo-list.use-case";
import { GetTodoListUseCase } from "src/use-cases/todo-list/get/get-user-todo-lists.use-case";
import { UpdateTodoListUseCase } from "src/use-cases/todo-list/update/update-todo-list.use-case";

import { DomainExceptionsFilter } from "../../exception-filters/domain-exceptions.exception-filter";

@Controller("v1/todo-lists")
@UseFilters(DomainExceptionsFilter)
export class TodoListController {
    public constructor(
        private readonly createTodoListUseCase: CreateTodoListUseCase,
        private readonly getTodoListUseCase: GetTodoListUseCase,
        private readonly updateTodoListUseCase: UpdateTodoListUseCase,
        private readonly deleteTodoListUseCase: DeleteTodoListUseCase,
    ) {}

    @Get(":id")
    public async getById(@Query("id") listId: string) {
        return this.getTodoListUseCase.execute({
            listId,
            userId: "asdf",
        });
    }

    @Get()
    public async getUserLists() {
        return [];
    }
}
