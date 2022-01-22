import { join } from "path";
import { Connection, createConnection, getConnectionOptions } from "typeorm";

import { ConfigFactoryService } from "./config/config-providers/config-factory";

let connection: Connection;

export async function createConnectionPool(): Promise<Connection> {
    if (connection) {
        return connection;
    }

    const connectionOptions = await new ConfigFactoryService().getConnectionOptions();
    Object.assign(connectionOptions, {
        synchronize: false,
        logging: true,
        entities: [join(__dirname, "**", "*.orm-entity.{ts,js}"),],
        migrations: ["dist/migrations/*.js",],
        migrationsDir: "dist/migrations",
        // migrationsRun: true,
    });

    connection = await createConnection(connectionOptions);

    return connection;
}
