import { ContainerModule } from "inversify";

import { TodoListBuilder, TodoListBuilderInjectionToken } from "./todo-list.builder";

export default new ContainerModule((bind) => {
    bind(TodoListBuilderInjectionToken).to(TodoListBuilder);
});
