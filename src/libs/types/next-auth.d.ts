// import "next-auth";

// declare module "next-auth" {
//     export type ISODateString = string

//     interface Session {
//         user?: {
//             /** Properti default next-auth */
//             name?: string | null;
//             email?: string | null;
//             image?: string | null;

//             /** Tambahkan properti custom di sini */
//             fullName?: string;
//             username?: string;
//             role?: string;
//             profilePicture?: string;
//             isActive?: boolean;
//             accessToken?: string;
//         };
//         /** Properti default next-auth */
//         expires: ISODateString
//     }
// }