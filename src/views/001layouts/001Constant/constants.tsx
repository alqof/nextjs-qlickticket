import { BiCategoryAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { CiGrid41 } from "react-icons/ci";
import { IoTicket } from "react-icons/io5";
import { PiFlagBannerFoldBold } from "react-icons/pi";
import { RiCalendarEventFill } from "react-icons/ri";
import { TfiWallet } from "react-icons/tfi";

const C_SIDEBAR_USER = [
    {
        key: "dashboard",
        label: "Dashboard",
        href: "/",
        icon: <CiGrid41 />
    },
    {
        key: "tiket",
        label: "Tiket Saya",
        href: "/tiketsaya",
        icon: <IoTicket />
    },
    {
        key: "profile",
        label: "Profile",
        href: "/profile",
        icon: <CgProfile />
    },
];

const C_SIDEBAR_ADMIN = [
    {
        key: "dashboard",
        label: "Dashboard",
        href: "/admin",
        icon: <CiGrid41 />
    },
    {
        key: "event",
        label: "Event",
        href: "/adamin/event",
        icon: <RiCalendarEventFill />
    },
    {
        key: "category",
        label: "Kategori",
        href: "/admin/category",
        icon: <BiCategoryAlt />
    },
    {
        key: "banner",
        label: "Kategori",
        href: "/admin/banner",
        icon: <PiFlagBannerFoldBold />
    },
    {
        key: "transaction",
        label: "Transaksi",
        href: "/admin/transaction",
        icon: <TfiWallet />
    },
];

export { C_SIDEBAR_ADMIN, C_SIDEBAR_USER };