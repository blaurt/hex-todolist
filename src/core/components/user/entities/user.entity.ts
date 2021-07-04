import { BaseEntity } from "src/core/shared/entities/BaseEntity.entity";
import {hash} from 'bcrypt'

//todo replace with adv encryptor
const SALT = 'asdjfhjk1h23123' as const;

export interface UserBuilderParams {
    login: User['login'];
    email: User['email'];
    password: string;
}

export class User extends BaseEntity {
   
        private _login: string;
        private _email: string;
        protected _passwordHash: string;

        public constructor() {
        super();
        
    }

    get login(){
        return this._login;
    }
//todo
    set login(value: string){
        this._login = value;
    }

    get email(){
        return this._email;
    }

    //todo
    set email(value: string){
        this._login = value;
    }

    get passwordHash(){
        return this._passwordHash;
    }
//todo
    set passwordHash(value: string){
        this._passwordHash = value;
    }



    public async validatePassword(input: string, passwordHash: string): Promise<boolean>{
        //todo implement
        return true;
    }

    public static async fromInput({email,login,password}:UserBuilderParams): Promise<User> {
        const user = new User();
        user.email = email;
        user.login = login;
        user.passwordHash = await hash(password, SALT);
        return user;
    }
}