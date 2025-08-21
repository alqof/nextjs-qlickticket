import React from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { FaRegEye, FaRegEyeSlash, FaSpinner } from "react-icons/fa";
import Image from "next/image";
import * as yup from 'yup';
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/libs/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import authInstance from "@/libs/axios/auth.instance";

const RegisterView = () => {
    const router = useRouter();
    const [isVisible, setIsVisible] = React.useState({password: false, confirmPassword:false});
    const toggleVisibility = (field: "password"|"confirmPassword") => {
        setIsVisible((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    }

    const registerSchema = yup.object({
        fullName: yup.string().required("please input your fullname"),
        username: yup.string().required("please input username"),
        email: yup.string().email("email format not valid").required("please input your email"),
        password: yup.string()
            .min(8, "please input your password")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[0-9]/, "Password must contain at least one number")
            .required("please input your password"),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password')], "Passwords must match")
            .required("please input confirmation password"),
    })

    const { register, handleSubmit, reset, formState: { errors }} = useForm<IRegister>({ resolver: yupResolver(registerSchema) });

    const {mutate: mutateRegister, isPending} = useMutation({
        mutationFn: async (payload: IRegister)=>{
            const result = await authInstance.register(payload);
            return result;
        },
        onError(error) {
            console.log(error);
        },
        onSuccess: () => {
            reset();
            router.push("/auth/register/success");
        }
    });

    const onSubmit: SubmitHandler<IRegister> = (data) => {
        // console.log(data);
        mutateRegister(data)
    };


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
                        <Image src='/images/logo/QlickTickett.png' alt='QlickTicket-Logo' width={100} height={100} />

                        <div className='text-left'>
                            <p className='text-lg font-bold'> Hi! Welcome </p>
                            <p className="text-sm"> Register for more benefits </p>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-8 py-6 space-y-8">
                    <h2 className="hidden md:block text-center text-xl text-lime-500 font-bold"> Registration </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-3">
                            <Input {...register("fullName")} label="Full Name" type="text" variant="faded" autoComplete="off" isInvalid={errors.fullName!==undefined} errorMessage={errors.fullName?.message} />
                            <Input {...register("username")} label="Username" type="text" variant="faded" autoComplete="off" isInvalid={errors.username!==undefined} errorMessage={errors.username?.message} />
                            <Input {...register("email")} label="Email" type="email" variant="faded" autoComplete="off" isInvalid={errors.email!==undefined} errorMessage={errors.email?.message} />
                            <Input
                                {...register("password")}
                                label="Password"
                                endContent={
                                    <button aria-label="toggle password visibility" className="focus:outline-solid outline-transparent" type="button" onClick={()=>toggleVisibility("password")}>
                                        { isVisible.password ? <FaRegEye className="text-xl text-default-400 pointer-events-none" /> : <FaRegEyeSlash className="text-xl text-default-400 pointer-events-none" /> }
                                    </button>
                                }
                                type={isVisible.password ? "text" : "password"}
                                variant="faded"
                                isInvalid={errors.password!==undefined}
                                errorMessage={errors.password?.message}
                            />
                            <Input
                                {...register("confirmPassword")}
                                label="Confirm Password"
                                endContent={
                                    <button aria-label="toggle password visibility" className="focus:outline-solid outline-transparent" type="button" onClick={()=>toggleVisibility("confirmPassword")}>
                                        { isVisible.confirmPassword ? <FaRegEye className="text-xl text-default-400 pointer-events-none" /> : <FaRegEyeSlash className="text-xl text-default-400 pointer-events-none" /> }
                                    </button>
                                }
                                type={isVisible.confirmPassword ? "text" : "password"}
                                variant="faded"
                                isInvalid={errors.confirmPassword!==undefined}
                                errorMessage={errors.confirmPassword?.message}
                            />
                        </div>

                        <div className="space-y-3">
                            <Button type="submit" color="success" className="w-full text-white text-shadow-lg font-bold" disabled={isPending}>
                                { isPending ? <FaSpinner className="animate-spin" /> : "Register"}
                            </Button >
                            <p className="text-sm text-gray-400"> Already have an account? <Link href={'/auth/login'} className="text-gray-600 dark:text-gray-50 font-semibold">Login</Link> </p>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    )
}
export default RegisterView;