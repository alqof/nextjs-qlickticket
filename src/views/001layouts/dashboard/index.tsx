import { ReactNode, useState } from "react";
import DashboardSidebarLayout from "./sidebar";
import { C_SIDEBAR_ADMIN, C_SIDEBAR_USER } from "../001Constant/constants";
import DashboardNavbarLayout from "../main/navbar";

interface propTypes {
    role?: string;
    children?: ReactNode;
}

const DashboardLayout = (props: propTypes) => {
    const { role, children } = props;
    const [open, setopen] = useState(false)

    return(
        <>
            <div className="max-w-screen ">
                <DashboardSidebarLayout sidebarItems={role==="admin" ? C_SIDEBAR_ADMIN : C_SIDEBAR_USER} isOpen={open} />
                <DashboardNavbarLayout />
                <div className="h-screen w-full lg:pl-[320px] p-6 overflow-y-auto">
                    { children }
                </div>
            </div>
        </>
    )
}
export default DashboardLayout;