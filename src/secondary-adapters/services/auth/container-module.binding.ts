import { ContainerModule } from "inversify";

import { HttpAuthService } from "./auth.service";
import { AuthServiceInjectionToken } from "./auth-service.interface";

export default new ContainerModule((bind) => {
    bind(AuthServiceInjectionToken).to(HttpAuthService);
});
