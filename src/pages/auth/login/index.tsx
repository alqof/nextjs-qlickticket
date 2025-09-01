import AuthLayout from "@/views/001layouts/auth";
import ViewLogin from "@/views/auth/login/vLogin";

const PageLogin = () => {
    return(
        <AuthLayout title="QlickTicket | Login">
            <ViewLogin />
        </AuthLayout>
    )
}
export default PageLogin;