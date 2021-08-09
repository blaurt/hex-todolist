import { compare, hash } from "bcrypt";

import { BaseEntity } from "../../../shared/entities/base-entity.entity";

// todo replace with adv encryptor
const ROUNDS = 10 as const;

export class User extends BaseEntity {
    public login: string;
    public email: string;
    public passwordHash: string;

    public async validatePassword(input: string, passwordHash: string): Promise<boolean> {
        return compare(input, passwordHash);
    }

    public async generatePasswordHash(password: string, rounds: number = ROUNDS): Promise<string> {
        return await hash(password, rounds);
    }
}
