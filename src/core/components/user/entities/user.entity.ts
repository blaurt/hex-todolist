import { BaseEntity } from "src/core/shared/entities/BaseEntity.entity";

export class User extends BaseEntity {
   
        private readonly login: string;
        private readonly email: string;
        private readonly password: string;
        private readonly passwordRepeat: string;

        public constructor() {
        super();
    }

    public async validatePassword(input: string, passwordHash: string): Promise<boolean>{
        //todo implement
        return true;
    }
}