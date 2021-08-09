import { User } from "../entities/user.entity";

export interface UserBuilderParams {
    login: User["login"];
    email: User["email"];
    password: string;
}
