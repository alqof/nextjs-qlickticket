import categoryServices from "@/libs/axios/category.services";
import mediaUploadServices from "@/libs/axios/mediaupload.services";
import { ICategory, ICategoryIcon } from "@/libs/types/category";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import {  Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter, useDisclosure} from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import { addToast } from "@heroui/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { div } from "framer-motion/client";
import { Camera } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { FiImage } from "react-icons/fi";
import * as yup from 'yup';



function getImageData(event: ChangeEvent<HTMLInputElement>){
    const file = event.target.files![0];
    const fileName = file?.name;
    const fileSize = file?.size;
    
    return { file, fileName, fileSize }
}



export default function ModalUpdateCategory(props: any){
    const { modalTitle, isOpen, onOpenChange, refetch, categoryId } = props;
    const maxSizeIcon = 1024 * 1024;
    const [previewImage, setPreviewImage] = useState<string|null>(null)
    const [fileName, setFileName] = useState<string | null>(null);

    // Fetch detail category by ID
    const { data: categoryData, isLoading: isLoadingGetCategory } = useQuery({
        queryKey: ['category', categoryId],
        queryFn: async () => {
            if (!categoryId) return null;
            const { data } = await categoryServices.getCategoriesById(categoryId);
            return data.data;
        },
        enabled: !!categoryId && isOpen,
    });

    const setDefaultName = categoryData?.name || null;
    const setDefaultDescription = categoryData?.description || null;
    const setDefaultIcon = categoryData?.icon || null;
    // console.log(setDefaultName, setDefaultDescription, setDefaultIcon);


    // => Schema
    const updateCategorySchema = yup.object({
        name: yup.string().required("please input category name"),
        description: yup.string().required("please input description"),
        icon: yup.mixed<FileList>().required("please input icon"),
    })
    
    // ReactHookForm
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(updateCategorySchema) });

    // axios
    const updateCategory = async (payload: ICategory) => {
        const { data } = await categoryServices.updateCategory(categoryId, payload);
        return data.data;
    }
    const uploadIcon = async (data: ICategoryIcon) => {
        if(!data.icon[0]){
            return { name: data.name, description: data.description, icon: setDefaultIcon };
        }else{
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
    }
    // TanStack mutate
    const {mutate: mutateUpdateCategory, isPending: isPendingUpdateCategory} = useMutation({
        mutationFn: updateCategory,
        onError(error) {
            // console.log(error);
            console.log("onError mutateAddCategory => ", error);
        },
        onSuccess: () => {
            reset();
            onOpenChange(false);
            addToast({
                title: "Update Category Success!",
                // description: "Please re-login again to access all features",
                variant: "bordered",
                color: "success",
            });
            refetch();
            // console.log("onSuccess => mutateAddCategory");
        }
    });
    const {mutate: mutateUploadIcon, isPending: isPendingUpload} = useMutation({
        mutationFn: uploadIcon,
        onError(error) {
            console.log("onError mutateUploadIcon => ", error);
        },
        onSuccess: (payload) => {
            // console.log(payload);
            mutateUpdateCategory(payload)
            // console.log("onSuccess => ", payload);
        }
    });

    const handleUpdateCategory = (data: ICategoryIcon) => mutateUploadIcon(data);
    const handleCloseUpdateCategory = ()=> {
        reset();
        setPreviewImage(null);
        setFileName(null);
        onOpenChange(false);
    }

    return(
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" scrollBehavior="inside">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1"> {modalTitle} </ModalHeader>

                <form onSubmit={handleSubmit(handleUpdateCategory)}>
                    {isLoadingGetCategory ? (
                        <div className="w-full h-full flex justify-center items-center">
                            <Spinner />
                        </div>
                    ): (
                        <ModalBody className="space-y-1">
                            <Input {...register("name")} defaultValue={setDefaultName} label="Name" labelPlacement="outside-top" placeholder="category name..." type="text" variant="faded" size="sm" isInvalid={errors.name!==undefined} errorMessage={errors.name?.message}/>
                            <Textarea {...register("description")} defaultValue={setDefaultDescription} label="Description" labelPlacement="outside-top" placeholder="description..." variant="faded" size="sm" isInvalid={errors.description!==undefined} errorMessage={errors.description?.message}/>

                            <div className="flex flex-col items-start gap-1">
                                <div className="min-w-fit max-w-full">
                                    {previewImage ? (
                                        <Avatar src={previewImage} className="w-fit h-24 p-2" radius="sm" isBordered={false} />
                                    ): (
                                        <Avatar src={setDefaultIcon} className="w-24 h-24 p-2" radius="sm" isBordered={false} />
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
                    )}

                    <ModalFooter>
                        <Button className="text-shadow-foreground font-semibold" size="sm" color="danger" variant="light" onPress={handleCloseUpdateCategory}>
                            Cancel
                        </Button>
                        <Button className="text-shadow-foreground font-semibold" size="sm" color="success" type="submit" disabled={isLoadingGetCategory || isPendingUpload || isPendingUpdateCategory}>
                            Submit
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}