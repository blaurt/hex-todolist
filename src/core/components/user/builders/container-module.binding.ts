import { ContainerModule } from "inversify";

import { UserBuilder, UserBuilderInjectionToken } from "./user.builder";

export default new ContainerModule((bind) => {
    bind(UserBuilderInjectionToken).to(UserBuilder);
});
