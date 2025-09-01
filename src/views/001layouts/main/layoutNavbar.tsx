import { ThemeToggle } from "@/views/002components/ThemeToggle";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Link, Button, Input, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem, DropdownSection, Switch } from "@heroui/react";
import { MoonIcon, SearchIcon, SunIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { LuTickets } from "react-icons/lu";
import { MdDashboard, MdExplore, MdOutlineEmojiEvents, MdOutlineSettings } from "react-icons/md";
import { useSession, signOut } from "next-auth/react";
import { TbHelpHexagon, TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { PiFlagBannerFill } from "react-icons/pi";
import { FaTags } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import clsx from "clsx";



const menuItemsDekstop = [
    { label: "Home", href: "/", icon: <MdDashboard size={22}/>, default: true, isAdmin: false, isMember: true },
    { label: "Explore Event", href: "/explore", icon: <MdExplore size={22}/>, default: true, isAdmin: false, isMember: true },
    { label: "My Tickets", href: "/member", icon: <LuTickets size={22}/>, default: false, isAdmin: false, isMember: true },
    { label: "Dashboard", href: "/admin", icon: <MdDashboard size={22}/>, default: false, isAdmin: true, isMember: false },
    { label: "Banner", href: "/admin/banner", icon: <PiFlagBannerFill size={22}/>, default: false, isAdmin: true, isMember: false },
    { label: "Category", href: "/admin/category", icon: <IoMdPricetags size={22}/>, default: false, isAdmin: true, isMember: false },
    { label: "Event", href: "/admin/event", icon: <MdOutlineEmojiEvents size={22}/>, default: false, isAdmin: true, isMember: false },
    { label: "Transaction", href: "/admin/transaction", icon: <LuTickets size={22}/>, default: false, isAdmin: true, isMember: false },
];
const menuItemsMemberMobile = [
    "Explore",
    "My Ticket",
    "Profile",
    "Settings",
    "Help & Feedback",
    "Log Out",
];
const menuItemsAdminMobile = [
    "Home",
    "Banner",
    "Category",
    "Event",
    "Transaction",
    "Profile",
    "Settings",
    "Help & Feedback",
    "Log Out",
];

export default function MainNavbarLayout() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    // check login status
    const { data: session, status } = useSession();
    if(status=="loading") return null;

    const isLoggedIn = !!session?.user;
    const sessionUser = session?.user ?? {};

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isBlurred height={75} maxWidth="full" className="p-0 lg:px-10 bg-lime-950 dark:bg-lime-900">
            <NavbarContent className="flex gap-4" as="div" justify="center">
                <NavbarBrand className="lg:mr-12">
                    <Link href="/">
                        <Image src={'/images/logo/QlickTickett.png'} alt="QlickTicket-Logo" width={70} height={80}/>
                    </Link>
                </NavbarBrand>

                {!isLoggedIn && 
                    menuItemsDekstop.map((item) => (
                        item.default && (
                            <NavbarItem key={item.href} isActive={router.pathname.startsWith(item.href)} className="hidden lg:flex gap-6">
                                <Link href={item.href} className="flex items-center gap-1">
                                    <span className={clsx("text-white", item.href===router.pathname && "text-yellow-500!")}> {item.icon} </span>
                                    <span className="text-white text-sm font-semibold"> {item.label} </span>
                                </Link>
                            </NavbarItem>
                        )
                    ))
                }

                {isLoggedIn && sessionUser.role=="admin" && 
                    menuItemsDekstop.map((item) => (
                        item.isAdmin && (
                            <NavbarItem key={item.href} isActive={router.pathname.startsWith(item.href)} className="hidden lg:flex gap-6">
                                <Link href={item.href} className="flex items-center gap-1">
                                    <span className={clsx("text-white", (router.pathname===item.href) && "text-yellow-500!")}> {item.icon} </span>
                                    <span className="text-white text-sm font-semibold"> {item.label} </span>
                                </Link>
                            </NavbarItem>
                        )
                    ))
                }

                {isLoggedIn && sessionUser.role=="member" && 
                    menuItemsDekstop.map((item) => (
                        item.isMember && (
                            <NavbarItem key={item.href} isActive={router.pathname.startsWith(item.href)} className="hidden lg:flex gap-6">
                                <Link href={item.href} className="flex items-center gap-1">
                                    <span className={clsx("text-white", (router.pathname===item.href) && "text-yellow-500!")}> {item.icon} </span>
                                    <span className="text-white text-sm font-semibold"> {item.label} </span>
                                </Link>
                            </NavbarItem>
                        )
                    ))
                }
                
            </NavbarContent>

            <NavbarContent className="hidden lg:flex items-center gap-6" as="div" justify="center">
                <Input
                    classNames={{
                        base: "max-h-fit w-full lg:max-w-[100rem]",
                        mainWrapper: "",
                        input: "text-small focus:",
                        inputWrapper: "font-sm",
                    }}
                    placeholder="Search events..."
                    size="sm"
                    startContent={<SearchIcon size={18} className="text-foreground/50"/>}
                    type="search"
                />
                {/* <Input
                    isClearable
                    classNames={{
                        base: "w-full sm:max-w-[100%]",
                        inputWrapper: "border-1",
                    }}
                    placeholder="Search by name..."
                    size="sm"
                    startContent={<SearchIcon className="text-default-300" />}
                    // value={filterValue}
                    variant="bordered"
                    // onClear={() => setFilterValue("")}
                    // onValueChange={onSearchChange}
                /> */}

                {isLoggedIn ? (
                    <NavbarItem as="div" className="hidden lg:flex">
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar isBordered as="button" className="transition-transform cursor-pointer" color="success" name="Jason Hughes" size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                            </DropdownTrigger>

                            <DropdownMenu className="space-y-4" aria-label="ProfileActions" variant="shadow">
                                <DropdownSection showDivider title="" aria-label="Help & Feedback">
                                    <DropdownItem key="user" textValue="user" className="h-14 gap-2 pointer-events-none select-none bg-transparent hover:bg-transparent active:bg-transparent" isReadOnly>
                                        <div className="w-full flex items-center gap-3">
                                            <div className="w-fit">
                                                <Avatar isBordered as="button" className="transition-transform cursor-pointer" color="success" name="Jason Hughes" size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold">alqof2</p>
                                                <p className="text-xs">alqofnuraji2@gmail.com</p>
                                            </div>
                                        </div>
                                    </DropdownItem>
                                </DropdownSection>

                                <DropdownSection showDivider title="" aria-label="Explore&Mytickets">
                                    <DropdownItem key="expoler" startContent={<MdExplore />} textValue="expoler"> Explore </DropdownItem>
                                    <DropdownItem key="member" startContent={<LuTickets />} textValue="member"> My Ticket </DropdownItem>
                                </DropdownSection>

                                <DropdownSection showDivider title="" aria-label="Profile&Settings">
                                    <DropdownItem key="profile" startContent={<CgProfile />} textValue="profile"> Profile </DropdownItem>
                                    <DropdownItem key="setting" startContent={<MdOutlineSettings />} textValue="setting"> Settings </DropdownItem>
                                </DropdownSection>

                                <DropdownSection title="" aria-label="Help&Feedback">
                                    <DropdownItem key="help_and_feedback" startContent={<TbHelpHexagon />} textValue="help_and_feedback"> Help & Feedback </DropdownItem>
                                    <DropdownItem key="logout" startContent={<TbLogout2 className="text-red-700" />} onPress={()=>signOut({callbackUrl: '/'})} textValue="logout"> 
                                        <span className="text-red-700 font-semibold">Log Out</span> 
                                    </DropdownItem>
                                </DropdownSection>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                ) : (
                    <NavbarItem className="hidden lg:flex gap-2">
                        <Button color="warning" variant="bordered" radius="sm" onPress={()=>router.push("/auth/register")}>
                            <span className="font-semibold text-white"> Register </span>
                        </Button>

                        <Button color="warning" href="/" variant="shadow" radius="sm" onPress={()=>router.push("/auth/login")}>
                            <span className="font-semibold text-white text-shadow-lg/30"> Login </span>
                        </Button>
                    </NavbarItem>
                )}
            </NavbarContent>

            {/* Mobile */}
            <NavbarMenuToggle className="lg:hidden text-white" aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            <NavbarMenu>
                {menuItemsMemberMobile.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link className="w-full" color={ index===2 ? "primary" : index===menuItemsMemberMobile.length-1 ? "danger" : "foreground" } href="#" size="lg">
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}