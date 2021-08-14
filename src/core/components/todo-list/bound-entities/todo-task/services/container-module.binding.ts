import { ContainerModule } from "inversify";
import { CreateUserService } from "src/core/components/user/services/create-user.service";

import { FindTodoTasksService } from "./find-todo-tasks.service";
import { UpdateTodoTaskService } from "./update-todo-task.service";

export default new ContainerModule((bind) => {
    bind(CreateUserService).toSelf();
    bind(FindTodoTasksService).toSelf();
    bind(UpdateTodoTaskService).toSelf();
});
