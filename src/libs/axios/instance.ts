import axios from "axios";
import environtment from "../config/environtment";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";


interface CustomSession extends Session {
    accessToken?: string;
}
const headers = {"Content-Type": "application/json"}
const instance = axios.create({
    baseURL: environtment.API_URL,
    headers,
    timeout: 60 * 1000,
});

instance.interceptors.request.use(
    async (request) => { 
        const session: CustomSession|null = await getSession();
        if(session && session.accessToken){
            request.headers.Authorization = `Bearer ${session.accessToken}`
        }
        return request;
    },
    error => Promise.reject(error),
)
instance.interceptors.response.use(
    (response) => response, 
    error => Promise.reject(error),
)
export default instance;