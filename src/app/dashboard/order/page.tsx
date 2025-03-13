'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";

import Order from "../components/OrderTable";
import OrderTable from "../components/OrderTable";
import { useState,useEffect } from "react";
import { gql } from "@apollo/client";
import graphqlHelper from "@/utils/graphqlClient";
import { DateTime } from "luxon";


const GET_ALL_ORDER = gql`
  query GetAllOrder {
    getAllOrder {
        id
        amount
        name
        itemImage
        phone
        email
        auctionId
        orderNumber
        status
        auctionTitle
        createdAt
        updatedAt
    }
  }
`;
const OrderReport = () => {
  const [orderData, setData] = useState();
const [loading, setLoading] = useState<boolean>(false);
const [startDate, setStartDate] = useState("")
const [endDate, setEndDate] = useState("");

function convertToISO(datetime: string): string {
    return DateTime.fromFormat(datetime, "yyyy-MM-dd HH:mm", { zone: "UTC" })
      .plus({ hours: 1, minutes: 44, seconds: 15, milliseconds: 985 }) // Add time difference
      .toISO()!; // Convert to ISO format
  }
  //get auctions
  function getOrderReport(startDate?:string, endDate?:string) {
   // console.log(`date:${startDate}`)
   setLoading(true)

    try {

       graphqlHelper.executeQuery(GET_ALL_ORDER,{startDate,endDate})
      .then((data: any)=>{
        setData(data);
        setLoading(false)

      })
    } catch (error) {
      setLoading(false)

      console.error("Error fetching auctions:", error);
    }
    
  }
 // const today = new Date();
 /* useEffect(() => {
    getOrderReport()
  }, []);*/
  //console.log(TransactionData)
return(
            <DefaultLayout>
      <Breadcrumb pageName="Orders" />

<div className="mx-auto max-w-242.5">
 
<div >
    <div className="w-[500px] p-8 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
<div >
    <div className="  flex flex-col gap-5.5 sm:flex-row ">

<DatePickerOne label="Start Date" value={""} onChange={setStartDate } />
<DatePickerOne label="End Date" value={""} onChange={setEndDate } />
</div>
<button className="mt-4 flex justify-center mb-4
rounded bg-primary px-6 py-2 font-medium
 text-gray hover:bg-opacity-90"
 onClick={()=>
  getOrderReport(startDate,endDate)
 }
>
 {loading?"Fetching Data...":"Submit"}
                    </button>
</div>
</div>
<div className="mx-auto max-w-242.5">

<OrderTable data={orderData} loading={loading} />
</div>
  </div>
  </div>
                </DefaultLayout>

      
  
  

    );
};

export default OrderReport;


