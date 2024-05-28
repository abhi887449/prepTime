import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <Component {...pageProps} />
        <div className="flex justify-center">
          <footer className="relative bottom-0 left-0 w-full text-white text-center py-4">
            <p className="text-sm">
              &copy; {2024} :{" "}
              <a
                target="_blank"
                className="underline underline-offset-2"
                href="https://github.com/abhi887449"
              >
                Abhishek Singh
              </a>
            </p>
          </footer>
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
