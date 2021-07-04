import {Column, Entity, PrimaryColumn} from 'typeorm';

// interface UserBuilderObj {
//     id?: number | undefined | null;

//     phone: string;

//     username: string;

//     notificationTokens?: string[] | undefined | null;
// }

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryColumn({name: 'id', generated: true})
    readonly id?: number;

    @Column({name: 'email'})
    readonly email: string;

    @Column()
    readonly password_hash: string;

    @Column({name: 'login'})
    readonly login: string;

   

    // public static fromObject(builder: UserBuilderObj): UserEntity {
    //     const user = new UserEntity();
    //     user.id = builder.id || undefined;
    //     user.phone = builder.phone;
    //     user.username = builder.username;
    //     if (builder.notificationTokens != null) user.notificationTokens = builder.notificationTokens;
    //     return user;
    // }
}
