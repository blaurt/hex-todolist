import { ConnectionOptions } from "typeorm";

import { PgConfig } from "../pg-config.interface";
import { BaseConfig } from "./base-config";
import { TestEnvConfig } from "./test-env-config";

export class ConfigFactoryService {
    public async getConnectionOptions(): Promise<ConnectionOptions> {
        return await this.getConfigProvider().getConnectionParams();
    }

    private getConfigProvider(): PgConfig {
        switch (process.env.NODE_ENV) {
        case "test":
            return new TestEnvConfig();
        default:
            return new BaseConfig();
        }
    }
}
