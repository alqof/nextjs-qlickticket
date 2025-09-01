import categoryServices from "@/libs/axios/category.services";
import mediaUploadServices from "@/libs/axios/mediaupload.services";
import { IFileUrl } from "@/libs/types/file";
import { Button } from "@heroui/button";
import {  Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter, useDisclosure} from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { useMutation, useQuery } from "@tanstack/react-query";


export default function ModalDeleteCategory(props: any){
    const { modalTitle, isOpen, onOpenChange, refetch, categoryId } = props;

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

    const getCategoryName = categoryData?.name || null;
    const getCategoryDescription = categoryData?.description || null;
    const getCategoryIcon = categoryData?.icon || null;

    const deleteCategory = async (id: string) => {
        const res = await categoryServices.deleteCategory(id);
        return res;
    }
    const deleteIcon = async (fileUrl: string) => {
        const { data } = await mediaUploadServices.deleteFile({fileUrl});
        return data;
    }

    const {mutate: mutateDeleteCategory, isPending: isPendingDeleteCategory} = useMutation({
        mutationFn: deleteCategory,
        onError(error) {
            // console.log(error);
            // alert(error);
            console.log("onErrordeleteCategory => ", error);
        },
        onSuccess: () => {
            addToast({
                title: "Delete Category Success!",
                variant: "bordered",
                color: "success",
            });
            onOpenChange(false);
            refetch();
            // console.log("onSuccess => mutateDeleteCategory");
        }
    });
    const {mutate: mutateDeleteIcon, isPending: isPendingDeleteIcon} = useMutation({
        mutationFn: deleteIcon,
        onError(error) {
            // console.log(error);
            // alert(error);
            console.log("onErrordeleteIcon => ", error);
        },
        onSuccess: () => {
            mutateDeleteCategory(categoryId);
            // console.log("onSuccess => mutateDeleteCategory");
        }
    });
    const handleDeleteCategory = (fileUrl: string) => mutateDeleteIcon(fileUrl);

    return(
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1"> {modalTitle} </ModalHeader>

                <ModalBody className="space-y-1">
                    <p>Are you sure to delete this category? </p>
                </ModalBody>

                <ModalFooter>
                    <Button className="text-shadow-foreground font-semibold" size="sm" color="danger" variant="light" onPress={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button className="text-shadow-foreground font-semibold" size="sm" color="success" type="submit" disabled={isPendingDeleteIcon || isPendingDeleteCategory} onPress={()=>handleDeleteCategory(getCategoryIcon)}>
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
};