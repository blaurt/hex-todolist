import { ConfigService } from "./config.interface";

export class AppConfig implements ConfigService {
    get<T extends string | number = string>(key: string): T {
        throw new Error("Method not implemented.");
    }
}
