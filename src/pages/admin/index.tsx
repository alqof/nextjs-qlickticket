import { ThemeToggle } from "@/views/002components/ThemeToggle";
import Headd from "@/views/001layouts/001Headd";
import MainLayout from "@/views/001layouts/main/layoutMain";
import AdminView from "@/views/admin/vAdmin";

export default function PageAdmin() {
  return (
    <>
      <Headd title="QlickTicket | Admin"/>
      <MainLayout role="">
        <AdminView />
      </MainLayout>
    </>
  );
}
