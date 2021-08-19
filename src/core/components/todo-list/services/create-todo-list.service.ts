import { inject, injectable } from "inversify";

import { TodoTask, TodoTaskConstructorParams } from "../bound-entities/todo-task/entities/todo-task.entity";
import { TodoList, TodoListConstructorParams } from "../entities/todo-list.entity";
import { TodoListRepository, TodoListRepositoryInjectionToken } from "../ports/todo-list.repository";

@injectable()
export class CreateTodoListService {
    public constructor(@inject(TodoListRepositoryInjectionToken) private readonly todoListRepository: TodoListRepository) {}
    public createList(todoListParams: TodoListConstructorParams, todoTasks: Array<Omit<TodoTaskConstructorParams, "listId">> = []) {
        const newList = new TodoList(todoListParams);

        // newList.items = todoTasks.map(
        //     (payload) =>
        //         new TodoTask({
        //             ...payload,
        //             listId: newList.entityId,
        //         }),
        // );
        const savedList = this.todoListRepository.save(newList);
        console.log("🚀 ~ file: create-todo-list.service.ts ~ line 1 ~ CreateTodoListService ~ createList ~ newList", newList);
        console.log("🚀 ~ file: create-todo-list.service.ts ~ line 17 ~ CreateTodoListService ~ createList ~ savedList", savedList);

        return savedList;
    }
}
