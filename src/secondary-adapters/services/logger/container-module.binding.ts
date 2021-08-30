import { ContainerModule } from "inversify";

import { HttpLoggerInjectionToken } from "./interfaces/http-logger.interface";
import { LoggerInjectionToken } from "./interfaces/logger.interface";
import { PinoLoggerService } from "./pino-logger.service";

export default new ContainerModule((bind) => {
    bind(HttpLoggerInjectionToken).to(PinoLoggerService)
        .inSingletonScope();
    bind(LoggerInjectionToken).to(PinoLoggerService)
        .inSingletonScope();
});
