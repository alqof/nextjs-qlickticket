import { IActivation, ILogin, IRegister } from "../types/auth";
import AxiosInstance from "./instance";


const authServices = {
    register: (payload: IRegister)=>AxiosInstance.post("/auth/register", payload),
    activation: (payload: IActivation)=>AxiosInstance.post("/auth/activation", payload),
    login: (payload: ILogin)=>AxiosInstance.post("/auth/login", payload),
    getLoginToken: (token: string)=>AxiosInstance.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}`}
    }),
}
export default authServices;