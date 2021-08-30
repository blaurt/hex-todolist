import "reflect-metadata";

import { appConfig } from "./configuration/app.config";
import { appInitializer } from "./lib/app-initilizer";
import { DIContainer } from "./lib/di-container";
import { bootstrap } from "./nest-js.bootrsrap";
import { Logger, LoggerInjectionToken } from "./secondary-adapters/services/logger/interfaces/logger.interface";

class Server {
    private readonly port: number;

    public constructor() {
        this.port = appConfig.port;
    }

    public async runServer(): Promise<void> {
        let logger: Logger;
        try {
            await appInitializer.initialize();
            logger = DIContainer.getInstance().get<Logger>(LoggerInjectionToken);
            bootstrap(this.port);
        } catch (error) {
            logger = DIContainer.getInstance().get<Logger>(LoggerInjectionToken);
            logger.error(error.message, error.stack);
            // TODO: Graceful shutdown
        }
    }
}

export default new Server().runServer();
