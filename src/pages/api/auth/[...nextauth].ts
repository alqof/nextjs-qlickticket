import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IJwt, ISession, IUser } from "@/libs/types/auth";
import authServices from "@/libs/axios/auth.services";
import environment from "@/libs/config/environtment";

export default NextAuth({
    session: {
        strategy: "jwt", //bisa session juga, default jwt
        maxAge: 60 * 60 * 1, //second * minute * hour
        // maxAge: 60 * 60 * 24,
    },
    secret: environment.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "Credentials",
            name: "Credentials",
            credentials: {
                identifier: { label: "identifier", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials: Record<"identifier"|"password", string> | undefined): Promise<IUser|null>{
                try {
                    const { identifier, password } = credentials as { identifier: string; password: string };
                    const ApiAuthLogin = await authServices.login({ identifier, password });
                    const accessToken = ApiAuthLogin.data.data;
                    const ApiAuthMe = await authServices.me(accessToken);
                    const user = ApiAuthMe.data.data;
                    if (accessToken && ApiAuthLogin.status===200 && ApiAuthMe.status===200) {
                        // return { 
                        //     ...user, 
                        //     accessToken: accessToken 
                        // };
                        user.accessToken = accessToken;
                        return user;
                    }else{
                        return null;
                    }
                } catch (err) {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: {token: IJwt, user: IUser}) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }: {session: ISession, token: IJwt }) {
            session.user = token.user;
            session.accessToken = token.user?.accessToken;
            
            return session;
        },
    }
})