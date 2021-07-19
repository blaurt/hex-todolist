import { Module } from "@nestjs/common";

import { mongoConfigProvider,postgresConfigProvider } from "./providers";

@Module({
    // imports: process.env.NODE_ENV === 'test' ? [postgresConfigProvider] : [mongoConfigProvider, mysqlConfigProvider],
    imports: [postgresConfigProvider],
})
export class DatabaseModule {}
