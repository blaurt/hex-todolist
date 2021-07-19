import { ConfigModule,ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

export const mongoConfigProvider = TypeOrmModule.forRootAsync({
    name: "mongodb",
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
        return {
            type: "mongodb",
            host: config.get("TYPEORM_MONGO_HOST"),
            port: parseInt(config.get("TYPEORM_MONGO_PORT"), 10),
            username: config.get("TYPEORM_MONGO_USERNAME"),
            password: config.get("TYPEORM_MONGO_PASSWORD"),
            database: config.get("TYPEORM_MONGO_DATABASE"),
            useNewUrlParser: true,
            synchronize: true,
            entities: [__dirname + "/../../**/*.entity{.ts,.js}"],
            migrations: [__dirname + "/../../../migration/*.ts"],
        };
    },
});

export const postgresConfigProvider = TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
        const configDatabaseName = "TYPEORM_DATABASE";
        const databaseName = config.get(configDatabaseName);

        if (!databaseName)
            throw new Error(`The "${configDatabaseName}" parameter in '.env' file is not set.`);

        const database = process.env.NODE_ENV === "test"
            ? `${databaseName.endsWith("_test")
                ? databaseName
                : databaseName + "_test"}`
            : databaseName;

        return {
            type: "postgres",
            host: config.get("TYPEORM_HOST"),
            port: parseInt(config.get("TYPEORM_PORT"), 10),
            username: config.get("TYPEORM_USERNAME"),
            password: config.get("TYPEORM_PASSWORD"),
            database,
            entities: [__dirname + "/../../../**/*.entity{.ts,.js}"],
            migrations: [__dirname + "/../../../migration/*.ts"],
            multipleStatements: process.env.NODE_ENV === "test",
            logging: !!config.get("TYPEORM_LOGGING"),
            supportBigNumbers: true,
            bigNumberStrings: false,
            charset: "utf8mb4",
        };
    },
});
