import { createConnectionPool } from "../secondary-adapters/dal/postgres/create-connection-pool";
import { JwtService, JwtServiceInjectionToken } from "../secondary-adapters/services/jwt/jwt-service.interface";
import { SignUpUseCase } from "../use-cases/auth/sign-up/sign-up.use-case";
import { DIContainer } from "./di-container";

class AppInitializer {
    public async initialize(): Promise<void> {
        this.initHttpLogging();
        DIContainer.getInstance();
        await this.initDatabase();
        this.initMiddleware();
    }

    private async initDatabase(): Promise<void> {
        await createConnectionPool();
    }

    private initMiddleware(): void {
        // this.app.disable("x-powered-by");
        // this.app.use(bodyParser.urlencoded({ extended: true }));
        // this.app.use(bodyParser.json());
    }

    private initHttpLogging() {
        // this.app.use(
        //     ExpressPinoLogger({
        //         logger,
        //     }),
        // );
    }
}

export const appInitializer = new AppInitializer();
