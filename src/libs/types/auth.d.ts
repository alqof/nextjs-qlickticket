import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";


interface IRegister {
    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};
interface IActivation {
    code: string;
}
interface ILogin {
    identifier: string;
    password: string;
}

interface IUser extends User {
    // fullName?: string;
    // username?: string;
    // profilePicture?: string;
    // isActive?: boolean;
    role?: string;
    accessToken?: string;
}
interface IJwt extends JWT{
    user?: IUser;
}
declare module "next-auth" {
    interface Session {
        user?: {
            fullName?: string | null;
            username?: string | null;
            email?: string | null;
            profilePicture?: string;
            role?: string;
            isActive?: boolean;
            activationCode?: string;
        };
        // accessToken?: string;
    }
}
interface ISession extends Session {
    // user?: {
    //     fullName?: string | null;
    //     username?: string | null;
    //     email?: string | null;
    //     profilePicture?: string;
    //     role?: string;
    //     isActive?: boolean;
    //     activationCode?: string;
    // };
    accessToken?: string;
}


export type { IRegister, IActivation, IUser, ISession, IJwt, ILogin}