import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export interface PgConfig {
    getConnectionParams: () => Promise<PostgresConnectionOptions>;
}
