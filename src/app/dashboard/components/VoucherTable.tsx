
import * as React from "react";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { useMediaQuery } from "@mui/material";


// Define the Inbox interface
/**
 * 
 * 
 */
export interface GetAllVoucher {
    //id:string;
   code:string;
    userEmail: string;
    expiresAt:string;
    isActive:Boolean
    createdBy:string;
    usageLimit: number;
    createdAt: string;
    appliesTo:string;
   
}

// Define the props for MessageTable component
interface VoucherTableProps {
  
  data:{getAllVoucher: GetAllVoucher[]};
  loading: boolean;
}



  // Define columns with responsive widths
  const columns: GridColDef[] = [
    { field: "userEmail", headerName: "Owner", minWidth: 120, flex: 1 },
    { field: "code", headerName: "Token", type: "string", minWidth: 200, flex: 2 },
    { field: "value", headerName: "Value", type: "number", minWidth: 200, flex: 2 },
    { field: "isActive", headerName: "Status", type: "boolean", minWidth: 200, flex: 2 ,
      renderCell:(params) =>(
        <>
        {params.value?<strong className="text-green-600">Active</strong>:<strong className="text-red-600">Used</strong>}
       </> 
      ),
    },

    { field: "createdBy", headerName: "Created_By", type: "string", minWidth: 200, flex: 2 },

    { field: "expiresAt", headerName: "Expire_Date", type: "string", minWidth: 200, flex: 2 },
    { field: "appliesTo", headerName: "Purpose", type: "string", minWidth: 200, flex: 2 },

    { field: "usageLimit", headerName: "Usage_Limit", type: "string", minWidth: 200, flex: 2 },
    {
      field: "createdAt",
      headerName: "Date/Time",
      minWidth: 150,
      flex: 1,
      //valueFormatter: (params) => timestampToReadable(params.value),
    },
  ];
  export default function VoucherTable({ 
    data, loading }: VoucherTableProps) {
    const isMobile = useMediaQuery("(max-width: 768px)");
  // Transform data to include a unique id
  const rows = data?.getAllVoucher.map((voucher) => ({
   // id: voucher.createdAt || index, // Ensure a unique id
    ...voucher,
    createdAt: new Date(parseInt(voucher.createdAt)).toLocaleString(),
    expiresAt: new Date(parseInt(voucher.expiresAt)).toLocaleString()

  })) || [];

  return (
    <div style={{ height: isMobile ? 400 : 520, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        slots={{ toolbar: GridToolbar }}
        disableRowSelectionOnClick
        autoPageSize
      />
    </div>
  );
}
