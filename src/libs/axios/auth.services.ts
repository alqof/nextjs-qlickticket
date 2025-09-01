import AxiosInstance from "./instance";
import { IActivation, ILogin, IRegister } from "../types/auth";


const authServices = {
    register: (payload: IRegister)=>AxiosInstance.post("/auth/register", payload),
    activation: (payload: IActivation)=>AxiosInstance.post("/auth/activation", payload),
    login: (payload: ILogin)=>AxiosInstance.post("/auth/login", payload),
    me: (token: string)=>AxiosInstance.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}`}
    }),
}
export default authServices;