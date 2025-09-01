import AuthLayout from "@/views/001layouts/auth";
import ViewRegister from "@/views/auth/register/vRegister";


const PageRegister = () => {
    return(
        <AuthLayout title="QlickTicket | Register">
            <ViewRegister />
        </AuthLayout>
    )
}
export default PageRegister;