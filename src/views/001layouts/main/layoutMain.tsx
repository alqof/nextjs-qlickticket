import { ReactNode, useState } from "react";
import MainNavbarLayout from "./layoutNavbar";
import { getSession } from "next-auth/react";
import { ISession } from "@/libs/types/auth";

interface propTypes {
    role?: string;
    children?: ReactNode;
}

const MainLayout = (props: propTypes) => {
    const { role, children } = props;
    // const session: ISession|null = await getSession();
    // // console.log(session)

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