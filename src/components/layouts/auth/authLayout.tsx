import Headd from "@/components/001/PageHead/Headd";
import { ReactNode } from "react";

interface propTypes {
    title?: string;
    children?: ReactNode;
}

const AuthLayout = (props: propTypes) => {
    const { title, children  } = props;

    return(
        <>
            <Headd title={title}/>
            <section className="min-h-screen flex items-center justify-center">
                {children}
            </section>
        </>
    )
}
export default AuthLayout;