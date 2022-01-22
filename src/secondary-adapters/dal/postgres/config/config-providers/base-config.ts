import { getConnectionOptions } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { PgConfig } from "../pg-config.interface";

export class BaseConfig implements PgConfig {
    async getConnectionParams() {
        return getConnectionOptions() as Promise<PostgresConnectionOptions>;
    }
}
