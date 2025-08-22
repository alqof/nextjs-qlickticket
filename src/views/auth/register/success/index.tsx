import { Button } from "@heroui/button";
import Image from "next/image";
import { useRouter } from "next/router";

const SuccessView = () => {
    const router = useRouter();

    return (
        <div className="p-6 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center w-full max-w-md">
                <div className="relative mb-4">
                    <Image src={'/images/logo/QlickTickett.png'} alt="QlickTicket-Logo" width={200} height={100}/>
                    <svg className="absolute -top-5 -left-5 h-16 w-16 text-yellow-800" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="white" stroke="currentColor" strokeWidth="2" />
                        <rect x="6" y="8" width="12" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="6,8 12,13 18,8" fill="none" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </div>

                <h1 className="mb-2 text-2xl text-shadow-md font-bold"> Registration Successful! </h1>
                <p className="text-gray-600 dark:text-white mb-6 text-center"> 
                    {/* Your account has been successfully created! <br /> */}
                    <span className="text-yellow-600">Please check your email to activate your account.</span> Once activated, you can log in and start using QlickTicket. 
                </p>

                <Button className="shadow-md text-white text-shadow-lg font-bold" color="success" onPress={()=>router.push("/")}>
                    {/* <Link href={'/auth/login'} className="text-white text-shadow-lg font-bold"> Go to login</Link> */}
                    Back to dashboard
                </Button>
            </div>
        </div>
    )
}
export default SuccessView;