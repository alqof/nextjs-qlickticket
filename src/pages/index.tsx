import { ThemeToggle } from "@/views/002components/ThemeToggle";
import MainView from "@/views";
import Headd from "@/views/001layouts/001Headd";
import MainLayout from "@/views/001layouts/main/layoutMain";

export default function Home() {
  return (
    <>
      <Headd title="QlickTicket"/>
      <MainLayout>
        <MainView />
      </MainLayout>
    </>
  );
}
