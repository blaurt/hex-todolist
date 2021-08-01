import { ContainerModule } from "inversify";

import { UserRepositoryInjectionToken } from "../../../../core/components/user/ports/user.repository";
import { UserRepositoryPgAdapter } from "./user-repository.adapter";

export default new ContainerModule((bind) => {
    bind(UserRepositoryInjectionToken).to(UserRepositoryPgAdapter);
});
