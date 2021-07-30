import { Module } from "@nestjs/common";

import { RestApiModule } from "./primary-adapters/web/rest-api/v1/rest-api.module";
import { DatabaseModule } from "./secondary-adapters/dal/postgres/database.module";

@Module({
    imports: [
        // DatabaseModule,
        RestApiModule,
    ],
})
export class AppModule {}
