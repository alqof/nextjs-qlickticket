import { ThemeToggle } from "@/views/002components/ThemeToggle";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Link, Button, Input, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { LuTickets } from "react-icons/lu";
import { MdDashboard, MdExplore } from "react-icons/md";


const menuItemsDekstop = [
    { label: "Home", href: "/", icon: <MdDashboard/> },
    { label: "My Tickets", href: "/member", icon: <LuTickets/> },
    { label: "Explore Event", href: "/explore", icon: <MdExplore/> },
];
const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
];
export default function MainNavbarLayout() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isBlurred height={75} maxWidth="full" className="bg-lime-950!">
            <NavbarContent className="flex gap-4" justify="center">
                <NavbarBrand className="lg:mr-12">
                    <Link href="/">
                        <Image src={'/images/logo/QlickTickett.png'} alt="QlickTicket-Logo" width={70} height={80}/>
                    </Link>
                </NavbarBrand>
                
                {menuItemsDekstop.map((item) => (
                    <NavbarItem key={item.href} isActive={router.pathname.startsWith(item.href)} className="hidden lg:flex gap-5">
                        <Link href={item.href}>
                            <span className="flex items-center gap-1 font-bold text-white"> {item.icon} {item.label} </span>
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent className="hidden lg:flex gap-4" as="div" justify="center">
                <NavbarItem className="hidden lg:flex gap-2">
                    <Input
                        classNames={{
                            base: "w-full lg:max-w-[100rem] h-10",
                            mainWrapper: "h-full",
                            input: "text-small focus:text-foreground ",
                            inputWrapper: "h-full font-normal",
                        }}
                        placeholder="Search events..."
                        size="sm"
                        startContent={<SearchIcon size={18} className="text-yellow-700 dark:text-yellow-500"/>}
                        type="search"
                    />
                    {/* <Input
                        key="outside-left"
                        label={<SearchIcon/>}
                        labelPlacement="outside-left"
                        placeholder="Enter your email"
                        type="email"
                    /> */}
                </NavbarItem>

                <NavbarItem className="hidden lg:flex">
                    <Button color="warning" variant="bordered" radius="sm" onPress={()=>router.push("/auth/register")}>
                        <span className="font-semibold text-white"> Register </span>
                    </Button>
                </NavbarItem>

                <NavbarItem className="hidden lg:flex">
                    <Button color="warning" href="/" variant="shadow" radius="sm" onPress={()=>router.push("/auth/login")}>
                        <span className="font-semibold text-white text-shadow-lg/30"> Login </span>
                    </Button>
                </NavbarItem>
            </NavbarContent>

            {/* Mobile */}
            <NavbarMenuToggle className="lg:hidden text-white" aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link className="w-full" color={ index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground" } href="#" size="lg">
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}