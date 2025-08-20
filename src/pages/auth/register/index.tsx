import AuthLayout from "@/components/layouts/auth";
import ViewRegister from "@/components/views/register";

const PageRegister = () => {
    return(
        <AuthLayout title="QlickTicket | Register">
            <ViewRegister/>
        </AuthLayout>
    )
}
export default PageRegister;