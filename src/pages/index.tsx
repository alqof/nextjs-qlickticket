import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@heroui/react";
import PageHead from "@/components/001/PageHead";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <PageHead/>
      <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, commodi.</p>
      <Button color="primary"> Test </Button>
    </>
  );
}
