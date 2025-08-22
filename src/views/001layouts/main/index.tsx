import { ReactNode, useState } from "react";
import MainNavbarLayout from "./navbar";

interface propTypes {
    role?: string;
    children?: ReactNode;
}

const MainLayout = (props: propTypes) => {
    const { role, children } = props;

    return(
        <div className="w-screen">
            <MainNavbarLayout />
            
            <div className="h-screen w-full px-6 lg:px-48 overflow-y-auto">
                { children }
            </div>
        </div>
    )
}
export default MainLayout;