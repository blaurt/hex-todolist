import { ContainerModule } from "inversify";

import { CreateTodoListUseCase } from "./create/create-todo-list.use-case";
import { DeleteTodoListUseCase } from "./delete/delete-todo-list.use-case";
import { GetTodoListUseCase } from "./get/get-user-todo-lists.use-case";
import { UpdateTodoListUseCase } from "./update/update-todo-list.use-case";

export default new ContainerModule((bind) => {
    bind(CreateTodoListUseCase).toSelf();
    bind(GetTodoListUseCase).toSelf();
    bind(UpdateTodoListUseCase).toSelf();
    bind(DeleteTodoListUseCase).toSelf();
});
