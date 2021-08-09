import { ContainerModule } from "inversify";

import { TodoItemBuilder, TodoItemBuilderInjectionToken } from "./todo-item.builder";

export default new ContainerModule((bind) => {
    bind(TodoItemBuilderInjectionToken).to(TodoItemBuilder);
});
