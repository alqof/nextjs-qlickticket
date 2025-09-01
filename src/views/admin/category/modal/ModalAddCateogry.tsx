import categoryServices from "@/libs/axios/category.services";
import mediaUploadServices from "@/libs/axios/mediaupload.services";
import { ICategory, ICategoryIcon } from "@/libs/types/category";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import {  Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter, useDisclosure} from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiImage } from "react-icons/fi";
import * as yup from 'yup';



function getImageData(event: ChangeEvent<HTMLInputElement>){
    const file = event.target.files![0];
    const fileName = file.name;
    const fileSize = file.size;
    
    return { file, fileName, fileSize }
}

export default function ModalAddCateogry(props: any){
    const { modalTitle, isOpen, onOpenChange, refetch } = props;
    
    // => Schema
    const mediaSchema = yup.object({
        name: yup.string().required("please input category name"),
        description: yup.string().required("please input description"),
        icon: yup.mixed<FileList>().required("please input icon"),
    })

    // ReactHookForm
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ICategoryIcon>({ resolver: yupResolver(mediaSchema) });

    // axios
    const addCategory = async (payload: ICategory) => {
        const res = await categoryServices.createCategory(payload);
        return res;
    }
    const uploadIcon = async (data: ICategoryIcon) => {
        const formData = new FormData();
        formData.append("file", data.icon[0]);
        const { 
            data: { 
                data: {
                    secure_url: icon
                }
            } 
        } = await mediaUploadServices.uploadFile(formData);
    
        return { name: data.name, description: data.description, icon };
    }

    // TanStack mutate
    const {mutate: mutateAddCategory, isPending: isPendingCategory} = useMutation({
        mutationFn: addCategory,
        onError(error) {
            // console.log(error);
            console.log("onError mutateAddCategory => ", error);
        },
        onSuccess: () => {
            onOpenChange(false);
            reset();
            setPreviewImage(null);
            setFileName(null)
            refetch();
            addToast({
                title: "Add Category Success!",
                variant: "bordered",
                color: "success",
            });
            // console.log("onSuccess => mutateAddCategory");
        }
    });
    const {mutate: mutateUploadIcon, isPending: isPendingUpload} = useMutation({
        mutationFn: uploadIcon,
        onError(error) {
            console.log("onError mutateUploadIcon => ", error);
        },
        onSuccess: (payload) => {
            mutateAddCategory(payload)
            // console.log("onSuccess => ", payload);
        }
    });

    const handleAddCategory = (data: ICategoryIcon) => mutateUploadIcon(data);
    const handleCloseAddCategory = ()=> {
        reset();
        setPreviewImage(null);
        setFileName(null)
        onOpenChange(false)
    }

    const maxSizeIcon = 1024 * 1024;
    const [previewImage, setPreviewImage] = useState<string|null>(null)
    const [fileName, setFileName] = useState<string | null>(null);

    return(
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" scrollBehavior="inside">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1"> {modalTitle} </ModalHeader>

                <form onSubmit={handleSubmit(handleAddCategory)}>
                    <ModalBody className="space-y-1">
                        <Input {...register("name")} label="Name" labelPlacement="outside-top" placeholder="category name..." type="text" variant="faded" size="sm" isInvalid={errors.name!==undefined} errorMessage={errors.name?.message}/>
                        <Textarea {...register("description")} label="Description" labelPlacement="outside-top" placeholder="description..." variant="faded" size="sm" isInvalid={errors.description!==undefined} errorMessage={errors.description?.message}/>

                        <div className="flex flex-col items-start gap-1">
                            <div className="min-w-fit max-w-full">
                                {previewImage ? (
                                    <Avatar src={previewImage} className="w-fit h-24 p-2" radius="sm" isBordered={false} />
                                ): (
                                    <Avatar src="/images/general/icon-default.png" className="w-24 h-24 p-2" radius="sm" isBordered={false} />
                                )}
                            </div>
                            
                            <Input
                                {...register("icon")} 
                                id="file-upload"
                                className="hidden"
                                label=""
                                labelPlacement="outside-top" 
                                placeholder="Chose icon"
                                startContent={<FiImage/>}
                                variant="flat" 
                                size="sm" 
                                type="file" 
                                accept=".jpg,.jpeg,.png" 
                                onChange={(e) => {
                                    register("icon").onChange(e);// ==> Bypass to <label>, because this class is hidden
                                    const { file, fileName, fileSize } = getImageData(e);
                                    if (file) {
                                        if (fileSize > maxSizeIcon) {
                                            e.target.value = "";
                                            setPreviewImage(null);
                                            setFileName(null);
                                            alert('Maximum size allowed is 1MB');
                                            return;
                                        }
                                        setPreviewImage(URL.createObjectURL(file));
                                        setFileName(fileName);
                                    } else {
                                        setPreviewImage(null);
                                        setFileName(null);
                                    }
                                }}
                                isInvalid={errors.icon!==undefined} 
                                errorMessage={errors.icon?.message}
                            />
                            <label htmlFor="file-upload" className="w-full max-w-full p-1.5 flex items-center justify-center gap-2 border border-dashed border-foreground-600 bg-foreground-300/80 text-sm text-foreground rounded-md cursor-pointer hover:bg-foreground-400/80 transition-all" style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
                                <Camera className="w-4 h-4" />
                                {previewImage ? (
                                    <span className="text-foreground break-words w-full"> {fileName} </span>
                                ) : (
                                    <span className="text-muted-foreground">Choose File</span>
                                )}
                            </label>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button className="text-shadow-foreground font-semibold" size="sm" color="danger" variant="light" onPress={handleCloseAddCategory}>
                            Cancel
                        </Button>
                        <Button className="text-shadow-foreground font-semibold" size="sm" color="success" type="submit" disabled={isPendingCategory}>
                            Submit
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
};