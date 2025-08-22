import { JSX } from "react";
import { Listbox ,ListboxSection,ListboxItem } from "@heroui/listbox";
import { Button } from "@heroui/button";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";
import { cn } from "@heroui/react";
import { useRouter } from "next/router";


interface sidebarItems {
    key: string;
    label: string;
    href: string;
    icon: JSX.Element;
}
interface propsType {
    sidebarItems: sidebarItems[];
    isOpen: boolean;
}

const DashboardSidebarLayout = (props: propsType) => {
    const router = useRouter();

    return(
        <div className="hidden lg:block fixed z-50 px-4 py-6 w-full h-screen max-w-[300px] flex flex-col justify-between border-r-1 border-default-200 transition-all">
            <div className="space-y-4">
                <div className="flex justify-center">
                    <Image src={'/images/logo/QlickTickett.png'} alt="QlickTicket-Logo" width={170} height={80}/>
                </div>

                <div className="w-full max-w-[260px] p-0">
                    <Listbox items={props.sidebarItems} aria-label="Dashboard Menu" >
                        {(item) => (
                            <ListboxItem key={item.key} className={cn("my-1 h-12 text-2xl", {"text-white bg-green-700": router.pathname.startsWith(item.href)})} variant="bordered" color="default" startContent={item.icon} textValue={item.label} aria-label={item.label}>
                                <span className="font-bold">{item.label}</span>
                            </ListboxItem>
                        )}
                    </Listbox>
                </div>
            </div>

            <div className="flex">
                <Button className="flex justify-start" color="warning" fullWidth variant="shadow" size="lg" onPress={()=>signOut()}> 
                    <BiLogOut /> Logout
                </Button>
            </div>
        </div>
    )
}
export default DashboardSidebarLayout;