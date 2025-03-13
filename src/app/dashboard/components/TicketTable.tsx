import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// Define the columns for the ticket data
const columns = [

  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'auctionId', headerName: 'Auction Id', width: 150 },
  { field: 'amount', headerName: 'Amount', type: 'number', width: 120 },
  { field: 'createdAt', headerName: 'Created At', width: 150 },
  { field: 'ticketNumber', headerName: 'Ticket N0', width: 150 },
];

// Reusable ticketTable component
export default function TicketTable({ data, loading }:{data:any,loading:boolean}) {
  // Transform the GraphQL response data into rows for the DataGrid
  const rows = data?.getTickets?.map((ticket:any) => ({
    id: ticket.id,
    auctionId:ticket.auctionId,
    amount: ticket.amount,
    createdAt: new Date(parseInt(ticket.createdAt)).toLocaleString(),
    ticketNumber: ticket.ticketNumber
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