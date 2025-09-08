import { ThemeToggle } from "@/views/002components/ThemeToggle";
import Headd from "@/views/001layouts/001Headd";
import MainLayout from "@/views/001layouts/main/layoutMain";
import AdminEventView from "@/views/admin/event/vAdminEvent";

export default function PageAdminEvent() {
    return (
        <>
            <Headd title="QlickTicket | Admin - Event"/>
            <MainLayout>
                <AdminEventView />
            </MainLayout>
        </>
    );
}
