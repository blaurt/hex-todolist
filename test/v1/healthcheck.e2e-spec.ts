import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { appInitializer } from "src/lib/app-initilizer";
import * as request from "supertest";

import { AppModule } from "../../src/app.module";

describe("HealthCheck controller (e2e)", () => {
    let app: INestApplication;

    beforeEach(async () => {
        await appInitializer.initialize();
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule,],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("/v1/health/self (GET)", () => {
        return request(app.getHttpServer()).get("/v1/health/self")
            .expect(200)
            .expect("v1/rest-api is healthy");
    });
});
