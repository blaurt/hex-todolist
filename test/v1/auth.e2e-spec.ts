import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { appInitializer } from "src/lib/app-initilizer";
import * as request from "supertest";
import { pgTestUtils } from "test/test-utils/postgres";

import { AppModule } from "../../src/app.module";

describe("Auth controller (e2e)", () => {
    let app: INestApplication;

    beforeAll(async () => {
        await pgTestUtils.init();
        await pgTestUtils.recreateDatabase();

        await appInitializer.initialize();
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule,],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe("Sign-up", () => {
        it("/v1/auth/signup (POST)", async () => {
            const signupPayload = {
                login: "testlogin",
                password: "testpassword",
                repeatPassword: "testpassword",
                email: "test@email.com",
            };
            const signupResponse = await request(app.getHttpServer()).post("/v1/auth/signup")
                .send(signupPayload)
                .expect(201);

            expect(signupResponse.body).toHaveProperty("id");
            expect(signupResponse.body).toMatchObject({
                email: expect.stringMatching(signupPayload.email),
                login: expect.stringMatching(signupPayload.login),
            });
            expect(signupResponse.body).toHaveProperty("access_token");
        });
    });

    describe("Sign-in", () => {
        it("/v1/auth/signup (POST)", async () => {
            const signupPayload = {
                login: "testlogin2",
                password: "testpassword2",
                repeatPassword: "testpassword2",
                email: "test2@email.com",
            };
            await request(app.getHttpServer()).post("/v1/auth/signup")
                .send(signupPayload)
                .expect(201);

            const { login, password, } = signupPayload;
            const signinResponse = await request(app.getHttpServer())
                .post("/v1/auth/signin")
                .send({
                    login,
                    password,
                })
                .expect(200);

            expect(signinResponse.body).toHaveProperty("id");
            expect(signinResponse.body).toMatchObject({
                email: expect.stringMatching(signupPayload.email),
                login: expect.stringMatching(signupPayload.login),
            });
            expect(signinResponse.body).toHaveProperty("access_token");
        });
    });
});
