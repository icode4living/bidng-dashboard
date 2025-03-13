//'use client';

import DefaultLayout from "@/components/Layouts/DefaultLayout";
/*import AuctionDetail from "../../../components/AuctionDetail";
import { Breadcrumbs } from "@mui/material";*/
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import AuctionPerformance from "../../../components/AuctionPermormance";
import BidData from "../../../components/AuctionDetailTable";
import React from "react"; // Import React to use React.use()
//import { useRouter } from "next/router";

// Define the expected type for the params object
interface PageProps {
  params: {
    auction_id: string;
  };
}

export default  function BidPage({params}) {
  // Unwrap the params object using React.use()
 
  return (
    <>
        <DefaultLayout>
          
          <AuctionPerformance id={params.bid_id || ''} />
          <div className="space-y-8 py-4">
            <a href={`/dashboard/auction/${params.bid_id|| ''}`}
             className="bg-blue-600 rounded text-white p-2">
              Edit Auction
             </a>
          </div>
          <Breadcrumb pageName="Auction Details" />
          <BidData id={params.bid_id|| ''} />
        </DefaultLayout>
    </>
  );
}