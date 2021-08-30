import { ContainerModule } from "inversify";
import { TodoTaskRepositoryInjectionToken } from "src/core/components/todo-list/bound-entities/todo-task/ports/todo-task.repository";

import { TodoTaskEntityMapper } from "./todo-task.entity-mapper";
import { TodoTaskRepositoryPgAdapter } from "./todo-task-repository.adapter";

export default new ContainerModule((bind) => {
    bind(TodoTaskRepositoryInjectionToken).to(TodoTaskRepositoryPgAdapter);
    bind(TodoTaskEntityMapper).toSelf();
});
