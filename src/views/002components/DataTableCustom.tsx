import {type Selection, type ChipProps, type SortDescriptor, Pagination, Select, SelectItem, Spinner, cn, useDisclosure} from "@heroui/react";
import { Button } from "@heroui/button";
import { Dropdown, DropdownTrigger } from "@heroui/dropdown";
import { Input } from "@heroui/input";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table"
import { SearchIcon } from "lucide-react";
import React, { ChangeEvent, ReactNode } from "react";
import { FaPlus } from "react-icons/fa";
import ModalAddCateogry from "../admin/category/modal/ModalAddCateogry";


export const C_DATATABLE_LIMIT_LIST = [
    // { label: "2", value: 2 },
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "25", value: 25 },
    { label: "50", value: 50 },
    // { label: "All", value: null },
]
export const C_LIMIT_DEFAULT = C_DATATABLE_LIMIT_LIST[0].value;
export const C_PAGE_DEFAULT = 1;


type propsType = {
    isEmpty: string;
    isLoading?: boolean;
    columns: Record<string, unknown>[];
    rows: Record<string, unknown>[];
    renderCell: (item: Record<string, unknown>, columnKey: React.Key) => ReactNode;

    onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    onClearSearch: ()=>void;

    optionalBtnTopContentLabel?: string;
    optionalBtnTopContentIsOpen?: boolean;
    optionalBtnTopContentOnOpen?: ()=>void;
    optionalBtnTopContentOnChange?: ()=>void;
    
    limit: number;
    onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;

    currentPage: number;
    totalPage: number;
    totalRows: number;
    onChangePage: (page: number)=>void;
}

const DataTableCustom = (props: propsType) => {
    const { 
        isEmpty, isLoading, 
        columns, rows, 
        renderCell, 
        onChangeSearch, onClearSearch, 
        optionalBtnTopContentLabel, optionalBtnTopContentIsOpen, optionalBtnTopContentOnOpen, optionalBtnTopContentOnChange, 
        limit, onChangeLimit, 
        currentPage, totalPage, totalRows, onChangePage 
    } = props;

    const TopContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        classNames={{
                            base: "w-full sm:max-w-[44%]",
                            inputWrapper: "border-1",
                        }}
                        placeholder="Search by name..."
                        size="sm"
                        startContent={<SearchIcon className="text-default-300" />}
                        // value={filterValue}
                        variant="bordered"
                        // onClear={() => setFilterValue("")}
                        onClear={onClearSearch}
                        onChange={onChangeSearch}
                    />
                    {optionalBtnTopContentLabel && (
                        <div className="flex gap-3">
                            <Button className="bg-foreground text-background" endContent={<FaPlus />} size="sm" onPress={optionalBtnTopContentOnOpen}>
                                {optionalBtnTopContentLabel}
                            </Button>
                            {/* <ModalAddCateogry isOpen={optionalBtnTopContentIsOpen} onOpenChange={optionalBtnTopContentOnChange} modalTitle={optionalBtnTopContentLabel}/> */}
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-foreground/75 text-small"> 
                        Total category: <span className="font-semibold"> {totalRows ?? 0}</span> 
                    </span>

                    <Select
                        className="max-w-25 h-fit rounded text-foreground/75 text-xs font-semibold cursor-pointer" 
                        size="sm" 
                        variant="underlined"
                        aria-label="Limitation Rows"
                        startContent={<p className="text-xs">Show: </p>}
                        defaultSelectedKeys={String(C_LIMIT_DEFAULT)}
                        // selectedKeys={[limit]}
                        selectionMode="single"
                        onChange={onChangeLimit}
                        disallowEmptySelection
                    >
                        {C_DATATABLE_LIMIT_LIST.map((item)=>(
                            <SelectItem key={item.value} textValue={item.label} className="text-xs! font-bold!"> <span className="text-xs font-semibold">{item.label}</span> </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
        );
    }, [ onChangeSearch, onClearSearch, optionalBtnTopContentLabel, optionalBtnTopContentOnOpen, limit, onChangeLimit ]);

    const BottomContent = React.useMemo(()=>{
        return(
            <div className="py-2 px-2 flex justify-center items-center">
                {totalPage>1 && (
                    <Pagination
                        isCompact
                        showControls
                        classNames={{ cursor: "bg-foreground text-background" }}
                        color="default"
                        page={currentPage}
                        total={totalPage}
                        onChange={onChangePage}
                        variant="light"
                    />
                )}
            </div>
        )
    }, [currentPage, totalPage, onChangePage])

    return(
        <Table 
            isCompact
            aria-label="DataTable Category"
            topContent={TopContent}
            topContentPlacement="outside"
            bottomContent={BottomContent}
            bottomContentPlacement="outside"
            classNames={{
                base: "max-w-full",
                wrapper: cn({"overflow-x-hidden": isLoading})
            }}
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid as React.Key} className="text-foreground font-bold bg-lime-700/50 dark:bg-lime-800/50"> {column.name as string} </TableColumn>
                )}
            </TableHeader>
            <TableBody 
                items={rows ?? []} 
                emptyContent={isEmpty} 
                isLoading={isLoading} 
                loadingContent={
                    <div className="z-2 h-full w-full flex items-center justify-center bg-foreground/10 backdrop-blur-sm">
                        <Spinner color="primary"/>
                    </div>
                }>
                {(item) => (
                    <TableRow key={item._id as React.Key}>
                        {(columnKey) => (
                            <TableCell> {renderCell(item, columnKey)} </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
};
export default DataTableCustom;