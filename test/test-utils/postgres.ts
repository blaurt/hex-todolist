import { createConnectionPool } from "src/secondary-adapters/dal/postgres/create-connection-pool";
import { Connection, createConnection, getConnectionOptions } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

class PostgresTestUtils {
    private primaryConnection: Connection;

    /**
     * Used to connect to default "postgres" db,
     * in order to (re)create specific db for tests
     */
    private auxiliaryConnection: Connection;

    public init = async () => {
        const options = await getConnectionOptions();
        this.auxiliaryConnection = await createConnection({
            ...options,
            database: "postgres",
            name: "auxiliary",
        } as PostgresConnectionOptions);
    };

    public recreateDatabase = async (dbName = "todo_main_db_test") => {
        if (await this.tryCreateDb(dbName)) {
            this.auxiliaryConnection.close();
            this.primaryConnection = await createConnectionPool();
            await this.runMigrations();

            return;
        }

        console.info("Reuse existing db");
        this.primaryConnection = await createConnectionPool();
        await this.clearDatabase();
    };

    public async clearDatabase() {
        for (const entity of this.primaryConnection.entityMetadatas) {
            await this.runQuery(`TRUNCATE TABLE ${entity.tableName} RESTART IDENTITY CASCADE;`);
        }
    }

    private async tryCreateDb(dbName: string) {
        try {
            await this.runAuxiliaryQuery(`CREATE DATABASE ${dbName};`);
            console.info(`Created new copy of database "${dbName}"`);

            return true;
        } catch (error) {
            // db replace console with logger interface
            console.info(`Database "${dbName}" cannot be created: ${error.message}`);

            return false;
        }
    }

    private async tryRemoveDb(dbName: string) {
        try {
            await this.runAuxiliaryQuery(`DROP DATABASE IF EXISTS ${dbName};`);
        } catch (error) {
            // db replace console with logger interface
            console.log(`Database "${dbName}" does not exist;`);
        }
    }

    private async runAuxiliaryQuery(query: string) {
        return this.auxiliaryConnection.manager.query(query);
    }

    private async runQuery(query: string) {
        return this.primaryConnection.manager.query(query);
    }

    private async runMigrations() {
        await this.primaryConnection.runMigrations();
    }
}

export const pgTestUtils = new PostgresTestUtils();
