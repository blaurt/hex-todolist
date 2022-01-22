import { getConnectionOptions } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { PgConfig } from "../pg-config.interface";

export class TestEnvConfig implements PgConfig {
    public async getConnectionParams(): Promise<PostgresConnectionOptions> {
        const baseOptions = (await getConnectionOptions()) as PostgresConnectionOptions;

        return {
            ...baseOptions,
            database: `${baseOptions.database}_test`,
        };
    }
}
