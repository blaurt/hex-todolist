import { LOG_LEVEL } from "src/secondary-adapters/services/logger/interfaces/log-levels.enum";

export enum NODE_ENV {
    LOCAL,
    TEST,
    PRODUCTION,
}

export interface AppConfig {
    port: number;
    logger: {
        level: LOG_LEVEL;
    };
    nodeEnv: NODE_ENV;
    jwtSecret: string;
    diContainerModulesPath: string[];
}

// todo pick from .env
// - default log level
// - port

export const appConfig: AppConfig = {
    port: 4000,
    nodeEnv: (process.env.NODE_ENV || NODE_ENV.LOCAL) as NODE_ENV, // todo type list of available environments
    logger: {
        level: LOG_LEVEL.INFO,
    },
    jwtSecret: "secret_key_here",
    diContainerModulesPath: [
        __dirname + "/../core/components/**/*container-module.binding{.ts,.js}",
        __dirname + "/../primary-adapters/**/*container-module.binding{.ts,.js}",
        __dirname + "/../secondary-adapters/**/*container-module.binding{.ts,.js}",
        __dirname + "/../use-cases/**/*container-module.binding{.ts,.js}",
    ],
};
