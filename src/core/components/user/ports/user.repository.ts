import { BaseRepository } from "../../../shared/interfaces/generic-crud.interface";
import { User } from "../entities/user.entity";

export interface UserRepository extends BaseRepository<User> {
    getBannedUsers(): Promise<User[]>;
    findByUsername(username: User["login"]): Promise<User | null>;
}

export const UserRepositoryInjectionToken = Symbol("UserRepository");
