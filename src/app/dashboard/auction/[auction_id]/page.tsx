//"use client"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AuctionDetail from "../../components/AuctionDetail";
import { Breadcrumbs } from "@mui/material";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import AuctionPerformance from "../../components/AuctionPermormance";

// Define the expected type for the params object
interface PageProps {
  params: {
    auction_id: string;
  };
}

export default async function AuctionPage({params}: {params: {auction_id: string }}) {
  return (
    <>
      <Suspense>
        <DefaultLayout>
        {/*<AuctionPerformance id={params.auction_id}/>*/}

          <Breadcrumb pageName="Update Auction" />
          <AuctionDetail id={params.auction_id} />
        </DefaultLayout>
      </Suspense>
    </>
  );
}