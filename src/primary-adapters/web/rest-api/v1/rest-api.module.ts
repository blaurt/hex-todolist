import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/secondary-adapters/dal/postgres/user/data/user.entity";
import { UserRepositoryPgAdapter } from "src/secondary-adapters/dal/postgres/user/repository/UserRepositoryAdapter";
import { SignUpUserUseCase } from "src/use-cases/user/signup.use-case";

import { UserController } from "./controllers/user/user.controller";

@Module({
    controllers: [UserController],
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [
        UserRepositoryPgAdapter,
        {
            provide: SignUpUserUseCase,
            useValue: (userRepository: UserRepositoryPgAdapter) => new SignUpUserUseCase(userRepository),
            inject: [UserRepositoryPgAdapter],
        },
    ],
})
export class RestApiModule {}
