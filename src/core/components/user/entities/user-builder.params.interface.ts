import { User } from "./user.entity";

export interface UserBuilderParams {
    login: User["login"];
    email: User["email"];
    password: string;
}
