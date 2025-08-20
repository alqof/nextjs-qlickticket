// import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@heroui/react";
import PageHead from "@/components/001/PageHead";
import { ThemeToggle } from "@/components/ThemeToggle";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function Home() {
  return (
    <>
      <PageHead/>

      <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, commodi.</p>
      <Button color="primary"> Test 1 </Button>
      <Button color="success"> Test 2 </Button>
      <Button color="warning"> Test 3 </Button>
      
      <div className="absolute top-1 right-1">
        <ThemeToggle/>
      </div>
    </>
  );
}
