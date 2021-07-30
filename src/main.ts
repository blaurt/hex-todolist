import "reflect-metadata";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { DIContainerFactory } from "./configuration/DIContainerFactory";
import { ConfigService, ConfigServiceInjectionToken } from "./secondary-adapters/services/config/config.interface";
import { JwtService, JwtServiceInjectionToken } from "./secondary-adapters/services/jwt/jwt-service.interface";

async function bootstrap() {
    const container = DIContainerFactory.getInstance();
    console.log("🚀 ~ file: main.ts ~ line 11 ~ bootstrap ~ container", (container as any)._bindingDictionary);
    // const serv = container.get<ConfigService>(ConfigServiceInjectionToken);
    const serv = container.get<JwtService>(JwtServiceInjectionToken);
    console.log("🚀 ~ file: main.ts ~ line 13 ~ bootstrap ~ s", await serv.sign({ test: 123 }));
    // const app = await NestFactory.create(AppModule);
    // await app.listen(3000);
}
bootstrap();
