import { ReactNode } from "react";
import Headd from "../001Headd";

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