import AuthLayout from "@/views/001layouts/auth";
import RegisterView from "@/views/auth/register";


const PageRegister = () => {
    return(
        <AuthLayout title="QlickTicket | Register">
            <RegisterView />
        </AuthLayout>
    )
}
export default PageRegister;