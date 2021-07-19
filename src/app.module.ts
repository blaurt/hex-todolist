import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { RestApiModule } from "./primary-adapters/web/rest-api/rest-api.module";
import { DatabaseModule } from "./secondary-adapters/dal/postgres/database.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
        DatabaseModule,
        RestApiModule,
    ],
})
export class AppModule {}
