import { ContainerModule } from "inversify";

import { JsonWebTokenService } from "./jsonwebtoken.service";
import { JwtServiceInjectionToken } from "./jwt-service.interface";

export default new ContainerModule((bind) => {
    bind(JwtServiceInjectionToken).to(JsonWebTokenService);
});
