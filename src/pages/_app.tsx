import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     refetchOnWindowFocus: false,
  //     retry: false,
  //   }
  // }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <QueryClientProvider client={queryClient}>
          <ToastProvider placement="top-center" toastOffset={"top-center".includes("top-center") ? 25 : 0} />
          <Component {...pageProps} />
        </QueryClientProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  )
}
