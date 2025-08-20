import AuthLayout from "@/components/layouts/auth";
import authInstance from "@/libs/axios/auth.instance";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";


interface propTypes {
    status: "success"|"failed";
    message: string;
}

const PageActivation = (props: propTypes) => {
    const router = useRouter();

    useEffect(() => {
    if (props.status==="success") {
        addToast({
            title: props.message,
            variant: "bordered",
            color: "success",
        });
    } else {
        addToast({
            title: props.message,
            variant: "bordered",
            color: "danger",
        });
    }
  }, [props.status]);

    return(
        <AuthLayout title="QlickTicket | Activation">
            <div className="p-6 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center w-full max-w-md">
                    <div className="relative mb-4">
                        <Image src={'/images/logo/QlickTickett.png'} alt="QlickTicket-Logo" width={200} height={100}/>
                        {props.status==="success" ? (
                            <svg className="absolute -top-5 -left-5 h-16 w-16 text-yellow-800" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4"
                                />
                            </svg>
                        ) : (
                            <svg className="absolute -top-5 -left-5 h-16 w-16 text-red-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" />
                                <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        )}
                    </div>

                    <h1 className="mb-2 text-2xl text-shadow-md font-bold"> Activation {props.status}! </h1>
                    <p className="text-gray-600 dark:text-white mb-6 text-center"> 
                        {props.status==="success" ? (
                            <>
                                <span className="text-yellow-600 font-bold">Your account has been activated!</span> Login now to access some QlickTicket features, Thankyou...
                            </>
                        ) : (
                            <>
                                <span className="text-red-600 font-bold">Failed to activate account.</span> Please try again or contact support.
                            </>
                        )}
                    </p>

                    {props.status==="success" ? (
                        <Button className="shadow-md text-white text-shadow-lg font-bold" color="success" onPress={()=>router.push("/auth/login")}>
                            Back to login
                        </Button>
                    ) : (
                        <Button className="shadow-md text-white text-shadow-lg font-bold" color="success" onPress={()=>router.push("/")}>
                            Home
                        </Button>
                    )}
                </div>
            </div>
        </AuthLayout>
    )
}
export default PageActivation;


// akan dipanggil di server, sebelum render halaman
export async function getServerSideProps(contex: {query:{code: string}}) {
    try {
        const result = await authInstance.activation({code: contex.query.code})
        // console.log("result status ==> ", result.status)
        // console.log("result data ==> ", result.data)

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