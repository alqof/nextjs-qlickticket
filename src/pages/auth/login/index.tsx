import AuthLayout from "@/components/layouts/auth";
import ViewLogin from "@/components/views/auth/login";

const PageLogin = () => {
    return(
        <AuthLayout title="QlickTicket | Login">
            <ViewLogin />
        </AuthLayout>
    )
}
export default PageLogin;