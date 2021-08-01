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

        // const container = DIContainer.getInstance();
        // console.log("🚀 ~ file: main.ts ~ line 11 ~ bootstrap ~ container", (container as any)._bindingDictionary);
        // // const serv = container.get<ConfigService>(ConfigServiceInjectionToken);
        // const serv = container.get<JwtService>(JwtServiceInjectionToken);
        // console.log("🚀 ~ file: main.ts ~ line 13 ~ bootstrap ~ s", await serv.sign({ test: 123 }));
        // const usecase = container.get<SignUpUseCase>(SignUpUseCase);
        // console.log("🚀 ~ file: app-initilizer.ts ~ line 20 ~ AppInitializer ~ initialize ~ usecase", usecase);
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
