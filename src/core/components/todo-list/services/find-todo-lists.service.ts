import { inject, injectable } from "inversify";
import { EntityNotFoundException } from "src/core/shared/exceptions/entity-not-found.exception";

import { TodoList } from "../entities/todo-list.entity";
import { TodoListRepository, TodoListRepositoryInjectionToken } from "../ports/todo-list.repository";

@injectable()
export class FindTodoListsService {
    public constructor(@inject(TodoListRepositoryInjectionToken) private readonly todoListRepository: TodoListRepository) {}
    public async findUserLists(userId: TodoList["userId"], includeDeleted = false): Promise<TodoList[]> {
        const lists = await this.todoListRepository.getUserLists(userId, { includeDeleted, });

        return lists;
    }

    public async findById(listId: TodoList["entityId"], includeDeleted = false): Promise<TodoList> {
        const list = await this.todoListRepository.getById(listId, { includeDeleted, });
        if (!list) {
            throw new EntityNotFoundException({ entityId: listId, });
        }

        return list;
    }
}
