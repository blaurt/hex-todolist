import { ContainerModule } from "inversify";
import { TodoTaskRepositoryInjectionToken } from "src/core/components/todo-list/bound-entities/todo-task/ports/todo-task.repository";

import { TodoTaskEntityMapper } from "./todo-item.entity-mapper";
import { TodoTaskRepositoryPgAdapter } from "./todo-item-repository.adapter";

export default new ContainerModule((bind) => {
    bind(TodoTaskRepositoryInjectionToken).to(TodoTaskRepositoryPgAdapter);
    bind(TodoTaskEntityMapper).toSelf();
});
