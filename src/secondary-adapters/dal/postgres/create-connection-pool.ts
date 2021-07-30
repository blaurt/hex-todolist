import { Connection, createConnection, getConnectionOptions } from "typeorm";

export async function createConnectionPool(): Promise<Connection> {
    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, {
        synchronize: false,
        logging: true,
        entities: [
            "dist/src/secondary-adapters/dal/postgres/**/*.orm-entity{.ts,.js}",
            "src/secondary-adapters/dal/postgres/**/*.orm-entity{.ts,.js}",
        ],
        migrations: ["dist/src/migrations/*.js"],
        migrationsDir: "dist/src/migrations",
        migrationsRun: true,
    });

    console.log("🚀 ~ file: create-connection-pool.ts ~ line 15 ~ createConnectionPool ~ connectionOptions", connectionOptions);

    return await createConnection(connectionOptions);
}
