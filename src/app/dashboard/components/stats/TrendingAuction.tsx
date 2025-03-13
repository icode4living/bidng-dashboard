'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AuctionTable from '@/app/dashboard/components/AuctionTable'
import { useState,useEffect } from "react";
import { gql } from "@apollo/client";
import graphqlHelper from "@/utils/graphqlClient";
import TrendingTable from "../TrendingTable";

const GET_AUCTIONS = gql`
  query TrendingAuctions($limit:Int, $offset:Int) {
    trendingAuctions(limit:$limit, offset:$offset) {
      id
    title
    startPrice
    category
    expiresAt
    isPremium
    createdAt
    }
  }
`;
const TrendingAuction = () => {
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


<>
<div>
    <div className="bg-white dark:bg-darBox px-4 py-4 space-x-6">
    <h4 className="text-xl font-bold dark:text-white">Trending Auction</h4>
    </div>
<TrendingTable data={auctionData} loading={loading} />

  </div>
  
 </>

      
  
  

    );
};

export default TrendingAuction;


