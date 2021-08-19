import { User } from "src/core/components/user/entities/user.entity";

export type UserJwtPayload = Pick<User, "login" | "email" | "entityId">;
