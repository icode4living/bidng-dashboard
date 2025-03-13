'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import AuctionForm from "@/components/Auction/form";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AuctionTable from '@/app/dashboard/components/AuctionTable'
import { AuctionDataStructure } from "@/types/auction";
import DummyData from '@/data/auction'
import { useState,useEffect } from "react";
import { gql } from "@apollo/client";
import graphqlHelper from "@/utils/graphqlClient";

const GET_AUCTIONS = gql`
  query GetAllAuctions($limit:Int, $offset:Int) {
    getAllAuctions(limit:$limit, offset:$offset) {
      id
    title
    description
    startPrice
    currentBid
    category
    slug
    sku
    expiresAt
    isPremium
    createdAt
    updatedAt
    }
  }
`;
const AuctionData = () => {
  const [auctionData, setData] = useState();
const [loading, setLoading] = useState(true);
  
  //get auctions
  async function getAuction(limit:number, offset:number) {
    try {
      const data = await graphqlHelper.executeQuery(GET_AUCTIONS,{limit,offset});
      setData(data);
      setLoading(false)
      console.log("Auctions:", data);
    } catch (error) {
      setLoading(true)

      console.error("Error fetching auctions:", error);
    }
    
  }
  useEffect(() => {
    getAuction(100,0)
  }, []);
  console.log(auctionData)
return(
            <DefaultLayout>
      <Breadcrumb pageName="Auction" />

{/*<div className="mx-auto max-w-242.5">
<div className="  flex flex-col gap-5.5 sm:flex-row p-8 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
<DatePickerOne label="Start Date" value={""} onChange={function (date: string): void {
            throw new Error("Function not implemented.");
          } } />
<DatePickerOne label="End Date" value={""} onChange={function (date: string): void {
            throw new Error("Function not implemented.");
          } } />
<SelectGroupOne label="Category" />
</div>
</div>


*/}
<div className="mx-auto max-w-242.5">
<AuctionTable data={auctionData} loading={loading} />

  </div>
  
  <div className="fixed right-10 bottom-10">
  <Fab size="small" 
  color="primary" 
  aria-label="add"
  href="/dashboard/create-auction">
  <AddIcon />
</Fab>
</div>
                </DefaultLayout>

      
  
  

    );
};

export default AuctionData;


