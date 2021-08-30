import { ContainerModule } from "inversify";

import { AppConfigService } from "./app-config.service";
import { ConfigServiceInjectionToken } from "./config.interface";

export default new ContainerModule((bind) => {
    bind(ConfigServiceInjectionToken).to(AppConfigService)
        .inSingletonScope();
});
