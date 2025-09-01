import { ThemeToggle } from "@/views/002components/ThemeToggle";
import Headd from "@/views/001layouts/001Headd";
import MainLayout from "@/views/001layouts/main/layoutMain";
import AdminEventView from "@/views/admin/vAdminEvent";

export default function PageAdminEvent() {
    return (
        <>
            <div className="absolute bottom-4 left-4">
                <ThemeToggle/>
            </div>
            
            <Headd title="QlickTicket | Admin - Event"/>
            <MainLayout role="">
                <AdminEventView />
            </MainLayout>
        </>
    );
}
