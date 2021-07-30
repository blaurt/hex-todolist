import { ContainerModule } from "inversify";

import { AppConfig } from "./app-config.service";
import { ConfigServiceInjectionToken } from "./config.interface";

export default new ContainerModule((bind) => {
    bind(ConfigServiceInjectionToken).to(AppConfig);
});
