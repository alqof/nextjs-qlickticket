import AuthLayout from "@/components/layouts/auth";
import RegisterView from "@/components/views/auth/register";


const PageRegister = () => {
    return(
        <AuthLayout title="QlickTicket | Register">
            <RegisterView />
        </AuthLayout>
    )
}
export default PageRegister;