import { ContainerModule } from "inversify";

import { CreateTodoListService } from "../../../services/create-todo-list.service";
import { FindTodoTasksService } from "./find-todo-tasks.service";
import { UpdateTodoTaskService } from "./update-todo-task.service";

export default new ContainerModule((bind) => {
    bind(CreateTodoListService).toSelf();
    bind(FindTodoTasksService).toSelf();
    bind(UpdateTodoTaskService).toSelf();
});
