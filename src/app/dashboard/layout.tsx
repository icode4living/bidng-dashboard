"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import client from "../../utils/appolo-client";
import ApolloProviderWrapper from "@/lib/AppolloProvider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">

      <ApolloProvider client={client}>

<div className="dark:bg-boxdark-2 dark:text-bodydark" suppressHydrationWarning>
      {loading ? <Loader /> : children}
    </div>
    </ApolloProvider>
    </html>
  );
}
{/*<html>
      <body suppressHydrationWarning={true}>

        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}
        </div>

      </body>
      </html>*/}