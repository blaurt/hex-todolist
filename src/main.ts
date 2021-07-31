import { appConfig } from "./configuration/app.config";
import { appInitializer } from "./lib/app-initilizer";
import { logger } from "./lib/logger";
import { bootstrap } from "./nest-js.bootrsrap";

class Server {
    private readonly port: number;

    public constructor() {
        this.port = appConfig.port;
    }

    public async runServer(): Promise<void> {
        try {
            await appInitializer.initialize();
            bootstrap(this.port);
        } catch (error) {
            logger.error(error);
            // TODO: Graceful shutdown
        }
    }
}

export default new Server().runServer();
