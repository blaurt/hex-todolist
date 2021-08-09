import { ContainerModule } from "inversify";
import { TodoItemRepositoryInjectionToken } from "src/core/components/todo-item/ports/todo-item.repository";

import { TodoItemRepositoryPgAdapter } from "./todo-item-repository.adapter";
import { TodoItemEntityMapper } from "./todo-item.entity-mapper";

export default new ContainerModule((bind) => {
    bind(TodoItemRepositoryInjectionToken).to(TodoItemRepositoryPgAdapter);
    bind(TodoItemEntityMapper).toSelf();
});
