import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const LoginView = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return(
        <div className="w-full p-6 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
            <div className="hidden md:block flex flex-col items-center justify-center">
                <p className="text-3xl font-bold">Hello! Welcome.</p>
                <p className="text-center mb-6">A quick and seamless solution for buying and managing tickets</p>
                <Image src={'/images/logo/QlickTickett.png'} alt="QlickTicket-Logo" width={300} height={100}/>
            </div>
            
            <Card className="w-full md:w-96">
                <CardHeader className="md:hidden bg-green-800">
                    <div className="flex items-center gap-3">
                        <Image src='/images/logo/QlickTickett.png' alt='qashless' width={100} height={100} />

                        <div className='text-left'>
                            <p className='text-lg font-bold'> Welcome Back! </p>
                            <p className="text-sm"> Login to access all features </p>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="p-8 space-y-8">
                    <h2 className="hidden md:block text-center text-xl text-lime-500 font-bold"> Login </h2>

                    <form action="" className="space-y-6">
                        <Input label="Username or Email" type="text" variant="faded"/>
                        <Input
                            endContent={
                                <button aria-label="toggle password visibility" className="focus:outline-solid outline-transparent" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                )}
                                </button>
                            }
                            label="Password"
                            type={isVisible ? "text" : "password"}
                            variant="faded"
                        />
                    </form>

                    <div className="space-y-3">
                        <Button type="submit" color="success" className="w-full text-white text-shadow-lg font-bold"> 
                            Login
                            {/* { isPending ? <FaSpinner className="animate-spin" /> : "Login"} */}
                        </Button >
                        <p className="text-sm text-gray-400"> Don&apos;t you have account? <Link href={'/auth/register'} className="text-gray-600 dark:text-gray-50">Register</Link> </p>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
export default LoginView;