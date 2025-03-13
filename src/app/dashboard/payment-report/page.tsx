'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";

import TransactionTable, { Transaction } from "../components/TransactionTable";
import { useState,useEffect } from "react";
import { gql } from "@apollo/client";
import graphqlHelper from "@/utils/graphqlClient";
import { DateTime } from "luxon";


const GET_AUCTIONS = gql`
  query GetTransactionsByDate($startDate:String!, $endDate:String!) {
    getTransactionsByDate(startDate:$startDate, endDate:$endDate) {
        id
        ref
        types
        status
        gateway
        amount
        currency
        timestamp
        cardPan
        accountDetails
    }
  }
`;
const TransactionData = () => {
  const [TransactionData, setData] = useState();
const [loading, setLoading] = useState(true);
const [startDate, setStartDate] = useState("")
const [endDate, setEndDate] = useState("");

function convertToISO(datetime: string): string {
    return DateTime.fromFormat(datetime, "yyyy-MM-dd HH:mm", { zone: "UTC" })
      .plus({ hours: 1, minutes: 44, seconds: 15, milliseconds: 985 }) // Add time difference
      .toISO()!; // Convert to ISO format
  }
  //get auctions
  async function getTransactionReport(startDate?:string, endDate?:string) {
    setLoading(true)
    console.log(`date:${startDate}`)
    try {
      const data = await graphqlHelper.executeQuery(GET_AUCTIONS,{startDate,endDate});
      setData(data);
      setLoading(false)
      console.log("Auctions:", data);
    } catch (error) {
      setLoading(false)

      console.error("Error fetching auctions:", error);
    }
    
  }
  const today = new Date();
  useEffect(() => {
    getTransactionReport()
  }, []);
  console.log(TransactionData)
return(
            <DefaultLayout>
      <Breadcrumb pageName="Transaction Report" />

<div >
    <div className="max-w-md p-8 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
<form onSubmit={(e)=>{
    e.preventDefault();
    getTransactionReport(startDate,endDate)
}}>
    <div className="  flex flex-col gap-5.5 sm:flex-row ">

<DatePickerOne label="Start Date" value={""} onChange={setStartDate } />
<DatePickerOne label="End Date" value={""} onChange={setEndDate } />
</div>
<button className="flex justify-center mb-4
rounded bg-primary px-6 py-2 font-medium
 text-gray hover:bg-opacity-90"
type="submit">
 {loading?"Fetching Data...":"Submit"}
                    </button>
</form>
</div>
<div className="mx-auto max-w-242.5">
<TransactionTable data={TransactionData} loading={loading} />
</div>
  </div>
  
                </DefaultLayout>

      
  
  

    );
};

export default TransactionData;


