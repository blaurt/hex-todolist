import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DIContainerFactory } from "src/configuration/DIContainerFactory";
import { UserRepository, UserRepositoryInjectionToken } from "src/core/components/user/ports/user.repository";
import { UserEntity } from "src/secondary-adapters/dal/postgres/user/data/user.entity";
import { UserRepositoryPgAdapter } from "src/secondary-adapters/dal/postgres/user/repository/UserRepositoryAdapter";
import { JwtService, JwtServiceInjectionToken } from "src/secondary-adapters/services/jwt/jwt-service.interface";
import { SignInUseCase } from "src/use-cases/auth/sign-in/sign-in.use-case";
import { SignUpUseCase } from "src/use-cases/auth/sign-up/sign-up.use-case";

import { UserController } from "./controllers/user/user.controller";

@Module({
    controllers: [UserController],
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [
        UserRepositoryPgAdapter,
        {
            provide: SignUpUseCase,
            useValue: () => {
                const container = DIContainerFactory.getInstance();
                const repository = container.get<UserRepository>(UserRepositoryInjectionToken);

                return new SignUpUseCase(repository);
            },
        },
        {
            provide: SignInUseCase,
            useValue: () => {
                const container = DIContainerFactory.getInstance();
                const repository = container.get<UserRepository>(UserRepositoryInjectionToken);
                const jwtService = container.get<JwtService>(JwtServiceInjectionToken);

                return new SignInUseCase(repository, jwtService);
            },
        },
    ],
})
export class RestApiModule {}
