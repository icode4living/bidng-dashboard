"use client"
import CardDataStats from "@/components/CardDataStats";
import graphqlHelper from "@/utils/graphqlClient";
import {gql} from '@apollo/client'
import { Suspense, useEffect, useState } from "react";
const GET_AUCTION_PERFORMANCE = gql `
query AuctionPerformance($auctionId:ID!){
    auctionPerformance(auctionId:$auctionId){
        auctionId
  totalBids
  highestBid
  auctionStatus
  createdAt
    }
    }
    `

    interface AuctionPerformance{
        auctionId:string;
  totalBids:number;
  highestBid:number;
  auctionStatus: string;
  createdAt:string;
}
interface Auction{
    auctionPerformance: AuctionPerformance;
}
export default function AuctionPerformance({id}:{id:string}){

    const [data, setData] = useState<Auction>();

    async function getAuctionPerformance(){

const auction: Auction = await graphqlHelper.executeQuery(GET_AUCTION_PERFORMANCE,{auctionId:id})
    setData(auction)
    console.log(auction)
    }
useEffect(()=>{
    getAuctionPerformance();
},[]);

return(
   <Suspense fallback={"loading.."}>
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <CardDataStats title="Total Bids" total={`${data?.auctionPerformance.totalBids}`} rate={`${(data?.auctionPerformance.totalBids!/data?.auctionPerformance.totalBids!)*100}%`} levelUp>
      <svg 
      width="22"
    height="16"
        className="fill-primary dark:fill-white"
      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
  <path stroke-linecap="round" 
  stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
</svg>
</CardDataStats>
<CardDataStats title="Highest Bid" total={`${data?.auctionPerformance.highestBid || "0"}`} rate="0.43%" levelUp>
<svg 
width="22"
height="16"
className="fill-primary dark:fill-white"

xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
</svg>
</CardDataStats>
<CardDataStats title="Auction Status" total={`${data?.auctionPerformance.auctionStatus || "Nill"}`} rate="0.43%" levelUp>
<svg 
width="22"
height="16"
className="fill-primary dark:fill-white"
xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
</svg>
</CardDataStats>
</div>
   </Suspense>
);
}