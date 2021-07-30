import { ContainerModule } from "inversify";

import { CreateUserService } from "./create-user.service";
import { FindUserService } from "./find-user.service";

export default new ContainerModule((bind) => {
    bind(CreateUserService).toSelf();
    bind(FindUserService).toSelf();
});
