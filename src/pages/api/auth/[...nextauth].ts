import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IJwt, ISession, IUser } from "@/libs/types/auth";
import authServices from "@/libs/axios/auth.services";
import environment from "@/libs/config/environtment";

export default NextAuth({
    session: {
        strategy: "jwt", // bisa session juga, default jwt
        maxAge: 60 * 60 * 24,
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
            async authorize(credentials: Record<"identifier" | "password", string> | undefined): Promise<IUser | null>{
                try {
                    const { identifier, password } = credentials as { identifier: string; password: string };
                    const ApiAuthLogin = await authServices.login({ identifier, password });
                    const token = ApiAuthLogin.data.data;
                    const ApiAuthMe = await authServices.getLoginToken(token);

                    const user: IUser = ApiAuthMe.data.data;
                    if (user) {
                        return user; // Jika login sukses
                    }
                    return null; // Jika login gagal
                } catch (err) {
                    return null; // Kalau ada error, login gagal
                }

            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: {token: IJwt; user: IUser | null}){
            if(user){
                token.user = user
            }
            return token;
        },
        async session({ token, session }: { token: any; session: any; }) {
            return {
                ...session,
                user: token.user,
                accessToken: token.user?.accessToken,
            };
        },
    }
})