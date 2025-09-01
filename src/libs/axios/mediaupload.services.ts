import { IFileUrl } from "../types/file";
import AxiosInstance from "./instance";


const headersSet = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
}
const mediaUploadServices = {
    uploadFile: (payload: FormData)=>AxiosInstance.post("/media/upload-single", payload, headersSet),
    deleteFile: (fileUrl: IFileUrl)=>AxiosInstance.delete("/media/remove", { data: fileUrl}),
}
export default mediaUploadServices;