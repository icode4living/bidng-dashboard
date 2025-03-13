import * as React from 'react';
import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';
import timestampToReadable from '@/utils/timeFormat';

// Define the Auction interface
interface Order {
  id: string;
  amount:number;
  name:string;
  itemImage:string;
  phone:string;
  status:string;
  email:string;
  orderNumber:string;
  auctionTiltle:string;
  createdAt:string;
}

// Define the props for the AuctionTable component
interface AuctionTableProps {
  data: { getAllOrder: Order[] };
  loading: boolean;
}

// Define the columns for the auction data
const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 200,
    
  },
  { field: 'orderNumber', headerName: 'Order N0', width: 200,
    renderCell: (params) => (
      <a href={`/dashboard/order/${params.value}`} style={{ textDecoration: 'underline', color: 'blue' }}>
        {params.value}
      </a>
    )
   },
  { field: 'auctionTitle', headerName: 'Item', width: 200 },
  { field: 'status', headerName: 'Status', width: 300 },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 150,
  },
  { field: 'name', headerName: 'Customer_Name', width: 300 },
  { field: 'phone', headerName: 'Customer_Phone', type: 'number', width: 120 },
  { field: 'email', headerName: 'Customer_Email', type: 'number', width: 120 },

  
  
];

// Reusable AuctionTable component
export default function OrderTable({ data, loading }: AuctionTableProps) {
  // Transform the GraphQL response data into rows for the DataGrid
  const rows = data?.getAllOrder.map((order) => ({
    ...order,
    createdAt: new Date(parseInt(order.createdAt)).toLocaleString(),
  })) || [];

  return (
    <div style={{ height: 520, width: '100%', overflowX:'scroll' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        slots={{ toolbar: GridToolbar }}
        disableRowSelectionOnClick
      />
    </div>
  );
}