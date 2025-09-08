import useDebounce, { C_DELAY_DEFAULT } from "@/hooks/debounce";
import eventServices from "@/libs/axios/event.services";
import { EVENT_COLUMN_LIST } from "@/libs/constants/event.constant";
import DataTableCustom, { C_LIMIT_DEFAULT, C_PAGE_DEFAULT } from "@/views/002components/DataTableCustom";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { useDisclosure } from "@heroui/modal";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, ReactNode, useCallback, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { TbListDetails } from "react-icons/tb";


function useEvent(){
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

        const res = await eventServices.getEvent(params)
        const { data } = res;

        // Sort data by name ASCENDING
        data.data = data.data.sort((a: any, b:any) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        return data;
    }
    const { data: dataEvent, isLoading, isRefetching, refetch } = useQuery({
        queryKey: ["Events", currentLimit, currentPage, currentSearch],
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

    return { setURL, currentPage, currentLimit, currentSearch, dataEvent, isLoading, isRefetching, refetch, handleChangePage, handleChangeLimit, handleChangeSearch, handleClearSearch }
}

export default function AdminEventView(){
    const { push, isReady, query } = useRouter();
    const { setURL, currentPage, currentLimit, currentSearch, dataEvent, isLoading, isRefetching, refetch, handleChangePage, handleChangeLimit, handleChangeSearch, handleClearSearch } = useEvent();
    const [selectedEventId, setSelectedEventId] = useState<string|null>(null)
    const {isOpen: isOpenAdd, onOpen: onOpenAdd, onOpenChange: onOpenChangeAdd} = useDisclosure();
    const {isOpen: isOpenUpdate, onOpen: onOpenUpdate, onOpenChange: onOpenChangeUpdate} = useDisclosure();
    const {isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete} = useDisclosure();

    const renderCell = useCallback((category: Record<string, unknown>, columnKey: React.Key) => {
        const cellValue = category[columnKey as keyof typeof category];
        switch(columnKey){
            case "banner": {
                return( <Avatar src={`${cellValue}`} className="w-fit h-24" radius="sm" isBordered={false} />)
            }
            case "isPublish": {
                return( 
                    <Chip size="sm" variant="dot" color={cellValue===true ? "success" : "default"}> {cellValue===true ? "Published" : "Not Publish"} </Chip>
                )
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
                            <DropdownItem key="view" textValue="view" startContent={<TbListDetails/>} onPress={()=>push(`/admin/event/${category._id}`)}> Detail </DropdownItem>
                            <DropdownItem key="update" textValue="update" startContent={<FiEdit/>} onPress={()=>{onOpenUpdate(); setSelectedEventId(category._id as string)}}> Edit </DropdownItem>
                            <DropdownItem key="delete" textValue="delete" startContent={<MdDeleteOutline className="text-red-600"/>} onPress={()=>{onOpenDelete(); setSelectedEventId(category._id as string)}}> <span className="text-red-600"> Delete </span> </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                )
            }
            default:
                return( cellValue as ReactNode)
        }
    }, []);

    useEffect(() => {
        if(isReady) setURL();
    }, [isReady])

    return(
        <>
            <h1 className="text-2xl lg:text-3xl font-bold"> Events </h1>
            <p className="mb-6 text-md"> 
                List all of event. Use this page to view, edit, or delete existing events. 
            </p>

            {Object.keys(query).length>0 && (
                <DataTableCustom 
                    isEmpty="category not found"
                    isLoading={isLoading}
                    // isLoading={isLoading || isRefetching}
                    columns={EVENT_COLUMN_LIST}
                    rows={dataEvent?.data}
                    renderCell={renderCell}
                    onChangeSearch={handleChangeSearch}
                    onClearSearch={handleClearSearch}
                    optionalBtnTopContentLabel="Add Event"
                    optionalBtnTopContentIsOpen={isOpenAdd}
                    optionalBtnTopContentOnOpen={onOpenAdd}
                    optionalBtnTopContentOnChange={onOpenChangeAdd}
                    limit={Number(currentLimit)}
                    onChangeLimit={handleChangeLimit}
                    currentPage={Number(currentPage)}
                    totalPage={dataEvent?.pagination.totalPage}
                    totalRows={dataEvent?.pagination.total}
                    onChangePage={handleChangePage}
                />
            )}
        </>
    )
}