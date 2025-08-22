import { ThemeToggle } from "@/views/002components/ThemeToggle";
import Headd from "@/views/001layouts/001Headd";
import MainLayout from "@/views/001layouts/main";
import AdminView from "@/views/admin/vAdmin";

export default function Home() {
  return (
    <>
      <div className="absolute bottom-4 left-4">
        <ThemeToggle/>
      </div>
      
      <Headd title="QlickTicket | Admin"/>
      <MainLayout role="">
        <AdminView />
      </MainLayout>
    </>
  );
}
