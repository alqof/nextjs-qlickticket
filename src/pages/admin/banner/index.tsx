import Headd from "@/views/001layouts/001Headd";
import MainLayout from "@/views/001layouts/main/layoutMain";
import AdminBannerView from "@/views/admin/banner/vAdminBanner";
import AdminCategoryView from "@/views/admin/category/vAdminCategory";

export default function PageAdminBanner() {
    return (
        <>
            <Headd title="QlickTicket | Admin - Banner"/>
            <MainLayout role="">
                <AdminBannerView />
            </MainLayout>
        </>
    );
}
