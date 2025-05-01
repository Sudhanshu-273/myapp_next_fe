"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserContextProvider } from "@/context/UserContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar/navbar";
import LoadingScreen from "@/components/LoadingScreen";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const publicPaths = ["/auth/login", "/auth/register"];
    const userStr = localStorage.getItem("curr_user");

    if (!userStr && !publicPaths.includes(pathname)) {
      router.push("/auth/login");
    } else {
      setCanRender(true);
    }
  }, [pathname, router]);

  const showNavbar = !pathname.startsWith("/auth");

  if (!canRender && !pathname.startsWith("/auth")) {
    return (
      <html lang="en">
        <body>
          <LoadingScreen />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster position={"bottom-right"} />
        <UserContextProvider>
          {showNavbar && <Navbar />}
          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
