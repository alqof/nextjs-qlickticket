import AuthLayout from "@/views/001layouts/auth";
import ActivationView from "@/views/auth/activation";
import authServices from "@/libs/axios/auth.services";
import { addToast } from "@heroui/toast";
import { useEffect } from "react";


interface propTypes {
    status: "success"|"failed";
    message: string;
}

const PageActivation = (props: propTypes) => {
    useEffect(() => {
        addToast({
            title: props.message,
            variant: "bordered",
            color: props.status==="success" ? "success" : "danger",
        });
    }, [props.status]);

    return(
        <AuthLayout title="QlickTicket | Activation">
            <ActivationView {...props} />
        </AuthLayout>
    )
}
export default PageActivation;


// akan dipanggil di server, sebelum render halaman
export async function getServerSideProps(context: {query:{code: string}}) {
    try {
        const result = await authServices.activation({code: context.query.code})

        if(result.status===200 && result.data.data){
            return {
                props: {
                    status: "success",
                    message: "Account activation successful!",
                }
            }
        }

        return {
            props: {
                status: "failed",
                message: "Account activation failed!",
            }
        }
    } catch (error) {
        return {
            props: {
                status: "failed",
                message: "Account activation failed!",
            }
        }
    }
} 