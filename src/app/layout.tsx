"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { ApolloProvider } from "@apollo/client";
import client from "@/utils/appolo-client";
import { hydrateRoot } from 'react-dom/client';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();
/*
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);*/

  return (

    <html lang="en">
      <body suppressHydrationWarning>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
         { children}
        </div>
      </body>
    </html>

  );
}
