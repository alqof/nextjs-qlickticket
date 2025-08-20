import AuthLayout from "@/components/layouts/auth";
import ViewLogin from "@/components/views/login";

const PageLogin = () => {
    return(
        <AuthLayout title="QlickTicket | Login">
            <ViewLogin></ViewLogin>
        </AuthLayout>
    )
}
export default PageLogin;