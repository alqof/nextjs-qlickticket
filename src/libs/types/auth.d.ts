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
interface IUser extends User {
    accessToken?: string;
    role?: string;
}
interface ISession extends Session {
    accessToken?: string;
}
interface IJwt extends JWT{
    user?: IUser;
}
interface ILogin {
    identifier: string;
    password: string;
}

export type { IRegister, IActivation, IUser, ISession, IJwt, ILogin}