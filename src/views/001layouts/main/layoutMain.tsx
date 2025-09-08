import { ReactNode, useEffect, useState } from "react";
import MainNavbarLayout from "./layoutNavbar";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

interface propTypes {
    children?: ReactNode;
}

const MainLayout = (props: propTypes) => {
    const { children } = props;

    return(
        <>
            <MainNavbarLayout />
            <main className="w-full p-4 lg:pt-8 lg:px-48">
                { children }
            </main>
        </>
    )
}
export default MainLayout;