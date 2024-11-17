"use client";
import { Provider } from "react-redux";
import { usePathname } from "next/navigation"; // Hook to access current route
import localFont from "next/font/local";
import Sidebar from "@/components/sidebar";
import SidebarRight from "@/components/sidebar-right";
import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/MobileFooter";
import "./globals.css";
import store from "./store/store"; // Adjust the path to your Redux store
import { useEffect } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current pathname

  // Define auth pages based on their routes
  const authPages = ["/auth/login", "/auth/signup"];

  // Check if the current page is an auth page
  const isAuthPage = authPages.includes(pathname);
  useEffect(() => {
    if (!localStorage.getItem("Authorization") && pathname === "/") {
      window.location.href = "/Chat_request";
    }
  }, []);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Conditionally render layout components for non-auth pages */}
        {!isAuthPage && (
          <>
            <Sidebar />
            <SidebarRight />
            <MobileHeader />
            <MobileFooter />
          </>
        )}
        <Provider store={store}>
          <div className="lg:ps-64 lg:pe-96">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
