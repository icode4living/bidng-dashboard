'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import AuctionForm from "@/components/Auction/form";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AuctionTable from '@/app/dashboard/components/AuctionTable'
//
import ticket from '@/data/ticket'
import TicketTable from "../components/TicketTable";

const TicketData = () => {
const loading = false;
return(
  <div className="relative">
            <DefaultLayout>
<div className="mx-auto max-w-242.5">
<Breadcrumb pageName="Auction" />
<div className="mb-4 px-8 py-4 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
<DatePickerOne label="Start Date" value={""} onChange={function (date: string): void {
            throw new Error("Function not implemented.");
          } } />
<DatePickerOne label="End Date" value={""} onChange={function (date: string): void {
            throw new Error("Function not implemented.");
          } } />
<SelectGroupOne label="Category" />
</div>
</div>
{/*
<TableTwo tableTitle="Auctions" headerTitle={data}/>

*/}
<div className="overflow-hidden">
<TicketTable data={ticket.data} loading={loading} />

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

      
  
  
                </div>

    );
};

export default TicketData;