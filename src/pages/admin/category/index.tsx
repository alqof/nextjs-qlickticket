import { ThemeToggle } from "@/views/002components/ThemeToggle";
import Headd from "@/views/001layouts/001Headd";
import MainLayout from "@/views/001layouts/main/layoutMain";
import AdminCategoryView from "@/views/admin/category/vAdminCategory";

export default function PageAdminCategory() {
    // SESSION HARUSNYA DISINI !!!!!!!!!
    return (
        <>
            <Headd title="QlickTicket | Admin - Category"/>
            <MainLayout role="">
                <AdminCategoryView />
            </MainLayout>
        </>
    );
}
