import * as pino from "pino";
import { Logger, LoggerOptions } from "pino";

import { appConfig } from "../configuration/app.config";

function initLogger(): Logger {
    const loggerOptions: LoggerOptions = {
        level: appConfig.logger.level,
    };

    // todo remove string "local"
    if (appConfig.node_env === "local") {
        loggerOptions.prettyPrint = {
            colorize: true,
        };
    }

    return pino(loggerOptions);
}

export const logger = initLogger();
