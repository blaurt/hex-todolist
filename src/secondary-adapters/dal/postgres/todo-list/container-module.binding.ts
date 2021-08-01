import { ContainerModule } from "inversify";
import { TodoListRepositoryInjectionToken } from "src/core/components/todo-list/ports/todo-list.repository";

import { TodoListEntityMapper } from "./todo-list.entity-mapper";
import { TodoListRepositoryPgAdapter } from "./todo-list-repository.adapter";

export default new ContainerModule((bind) => {
    bind(TodoListRepositoryInjectionToken).to(TodoListRepositoryPgAdapter);
    bind(TodoListEntityMapper).toSelf();
});
