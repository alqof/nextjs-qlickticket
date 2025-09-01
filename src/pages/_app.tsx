import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeToggle } from "@/views/002components/ThemeToggle";

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     refetchOnWindowFocus: false,
  //     retry: false,
  //   }
  // }
});

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <HeroUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <QueryClientProvider client={queryClient}>
            <ToastProvider placement="top-center" toastOffset={"top-center".includes("top-center") ? 25 : 0} />
            <Component {...pageProps} />
            <div className="fixed bottom-4 left-4">
              <ThemeToggle/>
            </div>
          </QueryClientProvider>
        </NextThemesProvider>
      </HeroUIProvider>
    </SessionProvider>
  )
}
