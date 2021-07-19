import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/secondary-adapters/dal/postgres/user/data/user.entity";
import { UserRepositoryPgAdapter } from "src/secondary-adapters/dal/postgres/user/repository/UserRepositoryAdapter";
import { SignUpUser } from "src/use-cases/user/signup.use-case";

import { UserController } from "./controllers/user.controller";

@Module({
    controllers: [UserController],
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [
        UserRepositoryPgAdapter, {
            provide: SignUpUser,
            useFactory: (rep: UserRepositoryPgAdapter) => {
                const useCase = new SignUpUser();

                // todo
                useCase.repository = rep;

                return useCase;
            },
            inject: [UserRepositoryPgAdapter],
        },
    ],
})
export class RestApiModule {}
