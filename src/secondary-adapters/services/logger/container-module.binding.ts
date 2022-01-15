import { AsyncLocalStorage } from "async_hooks";
import { ContainerModule } from "inversify";

import { als, ALS_TOKEN } from "./als";
import { HttpLoggerInjectionToken } from "./interfaces/http-logger.interface";
import { LoggerInjectionToken } from "./interfaces/logger.interface";
import { PinoLoggerService } from "./pino-logger.service";
import { WinstonLoggerService } from "./winston-logger.service";

export default new ContainerModule((bind) => {
    bind(HttpLoggerInjectionToken).to(WinstonLoggerService)
        .inSingletonScope();
    bind(LoggerInjectionToken).to(WinstonLoggerService)
        .inSingletonScope();
    bind(ALS_TOKEN).toConstantValue(als);
});
