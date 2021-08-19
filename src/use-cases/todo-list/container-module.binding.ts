import { ContainerModule } from "inversify";

import { CreateTodoListUseCase } from "./create/create.use-case";
import { DeleteTodoListUseCase } from "./delete/delete.use-case";
import { GetTodoListUseCase } from "./get/get.use-case";
import { UpdateTodoListUseCase } from "./update/update.use-case";

export default new ContainerModule((bind) => {
    bind(CreateTodoListUseCase).toSelf();
    bind(GetTodoListUseCase).toSelf();
    bind(UpdateTodoListUseCase).toSelf();
    bind(DeleteTodoListUseCase).toSelf();
});
