import { Module } from "@nestjs/common";

import { RestApiModule } from "./primary-adapters/web/rest-api/v1/rest-api.module";

@Module({
    imports: [RestApiModule],
})
export class AppModule {}
