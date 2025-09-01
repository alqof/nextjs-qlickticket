import { ChangeEvent, ReactNode, useCallback, useEffect, useState } from "react"
import DataTableCustom, { C_LIMIT_DEFAULT, C_PAGE_DEFAULT } from "../../002components/DataTableCustom"
import Image from "next/image";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { useRouter } from "next/router";
import { CATEGORY_COLUMN_LIST } from "@/libs/constants/category.constant";
import { SlOptionsVertical } from "react-icons/sl";
import categoryServices from "@/libs/axios/category.services";
import { useQuery } from "@tanstack/react-query";
import useDebounce, { C_DELAY_DEFAULT } from "@/hooks/debounce";
import { useDisclosure } from "@heroui/modal";
import { Avatar } from "@heroui/avatar";
import ModalAddCateogry from "./modal/ModalAddCateogry";
import ModalDeleteCategory from "./modal/ModalDeleteCategory";
import ModalUpdateCategory from "./modal/ModalUpdateCategory";


function useCategory(){
    const router = useRouter();
    const debounce = useDebounce();

    const currentLimit = router.query.limit;
    const currentPage = router.query.page;
    const currentSearch = router.query.search;

    const setURL = ()=>{
        router.replace({
            query: {
                limit: currentLimit || C_LIMIT_DEFAULT,
                page: currentPage || C_PAGE_DEFAULT,
                search: currentSearch || "",
            }
        })
    }
    const getCategories = async ()=>{
        let params = `limit=${currentLimit}&page=${currentPage}`;
        if(currentSearch) params += `&search=${currentSearch}`

        const res = await categoryServices.getCategories(params)
        const { data } = res;

        // Sort data by name ASCENDING
        data.data = data.data.sort((a: any, b:any) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        return data;
    }
    const { data: dataCategory, isLoading, isRefetching, refetch } = useQuery({
        queryKey: ["Category", currentLimit, currentPage, currentSearch],
        queryFn: ()=>getCategories(),
        enabled: router.isReady && !!currentPage  && !!currentPage,
    })
 
    const handleChangePage = (page: number)=>{
        router.push({
            query: {
                ...router.query,
                page,
            }
        })
    }
    const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
        router.push({
            query: {
                ...router.query,
                limit: e.target.value,
                page: C_PAGE_DEFAULT,
            }
        })
    }
    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        debounce(()=>{
            router.push({
                query: {
                    ...router.query,
                    search: e.target.value,
                    page: C_PAGE_DEFAULT,
                }
            })
        }, C_DELAY_DEFAULT)
    }
    const handleClearSearch = () => {
        router.push({
            query: {
                ...router.query,
                search: '',
                page: C_PAGE_DEFAULT,
            }
        })
    }

    return { setURL, currentPage, currentLimit, currentSearch, dataCategory, isLoading, isRefetching, refetch, handleChangePage, handleChangeLimit, handleChangeSearch, handleClearSearch }
}

export default function AdminCategoryView(){
    const { push, isReady, query } = useRouter();
    const { setURL, currentPage, currentLimit, currentSearch, dataCategory, isLoading, isRefetching, refetch, handleChangePage, handleChangeLimit, handleChangeSearch, handleClearSearch } = useCategory();
    const [selectedCategoryId, setSelectedCategoryId] = useState<string|null>(null)
    const {isOpen: isOpenAdd, onOpen: onOpenAdd, onOpenChange: onOpenChangeAdd} = useDisclosure();
    const {isOpen: isOpenUpdate, onOpen: onOpenUpdate, onOpenChange: onOpenChangeUpdate} = useDisclosure();
    const {isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete} = useDisclosure();

    useEffect(() => {
        if(isReady) setURL();
    }, [isReady])
    

    const renderCell = useCallback((category: Record<string, unknown>, columnKey: React.Key) => {
        const cellValue = category[columnKey as keyof typeof category];
        switch(columnKey){
            case "icon": {
                return( <Avatar src={`${cellValue}`} className="w-fit h-24" radius="sm" isBordered={false} />)
            }
            case "actions": {
                return(
                    <Dropdown className="bg-background border-1 border-default-200">
                        <DropdownTrigger>
                            <Button isIconOnly radius="full" size="sm" variant="light">
                                <SlOptionsVertical size={18} />
                            </Button>
                        </DropdownTrigger>

                        <DropdownMenu>
                            <DropdownItem key="view" onPress={()=>push(`/admin/category/${category._id}`)}> Detail </DropdownItem>
                            <DropdownItem key="update" onPress={()=>{onOpenUpdate(); setSelectedCategoryId(category._id as string)}}> Edit </DropdownItem>
                            <DropdownItem key="delete" onPress={()=>{onOpenDelete(); setSelectedCategoryId(category._id as string)}}> Delete </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                )
            }
            default:
                return( cellValue as ReactNode)
        }
    }, []);

    return(
        <div className="xxxxxx">
            <h1 className="text-2xl lg:text-3xl font-bold"> Category </h1>
            <p className="mb-6 text-md"> Browse and manage all event categories. Use this page to view, edit, or delete categories for your events. </p>
            {/* <DataTableCustom columns={CATEGORY_COLUMN_LIST} rows={xdummydata} renderCell={renderCell} onChangeSearc={} onClearSearch={} /> */}
            {Object.keys(query).length>0 && (
                <DataTableCustom 
                    isEmpty="category not found"
                    isLoading={isLoading}
                    // isLoading={isLoading || isRefetching}
                    columns={CATEGORY_COLUMN_LIST}
                    rows={dataCategory?.data}
                    renderCell={renderCell}
                    onChangeSearch={handleChangeSearch}
                    onClearSearch={handleClearSearch}
                    optionalBtnTopContentLabel="Add Category"
                    optionalBtnTopContentIsOpen={isOpenAdd}
                    optionalBtnTopContentOnOpen={onOpenAdd}
                    optionalBtnTopContentOnChange={onOpenChangeAdd}
                    limit={Number(currentLimit)}
                    onChangeLimit={handleChangeLimit}
                    currentPage={Number(currentPage)}
                    totalPage={dataCategory?.pagination.totalPage}
                    totalRows={dataCategory?.pagination.total}
                    onChangePage={handleChangePage}
                />
            )}

            <ModalAddCateogry isOpen={isOpenAdd} onOpenChange={onOpenChangeAdd} modalTitle={"Add Category"} refetch={refetch} />
            <ModalUpdateCategory isOpen={isOpenUpdate} onOpenChange={onOpenChangeUpdate} modalTitle={"Update Category"} refetch={refetch} categoryId={selectedCategoryId}/>
            <ModalDeleteCategory isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete} modalTitle={"Delete Category"} refetch={refetch} categoryId={selectedCategoryId}/>
        </div>
    )
}