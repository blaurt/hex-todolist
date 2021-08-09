import { ContainerModule } from "inversify";
import { CreateUserService } from "src/core/components/user/services/create-user.service";

import { FindTodoItemsService } from "./find-todo-items.service";
import { UpdateTodoItemService } from "./update-todo-item.service";

export default new ContainerModule((bind) => {
    bind(CreateUserService).toSelf();
    bind(FindTodoItemsService).toSelf();
    bind(UpdateTodoItemService).toSelf();
});
