import * as React from 'react';
import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';
import timestampToReadable from '@/utils/timeFormat';

// Define the Auction interface
interface Auction {
  id: string;
  title: string;
  image:string
  startPrice: number;
  currentBid: number | null;
  category: string | null;
  expiresAt: string;
  isPremium: boolean;
  createdAt: string;
}

// Define the props for the AuctionTable component
interface AuctionTableProps {
  data: { trendingAuctions: Auction[] };
  loading: boolean;
}

// Define the columns for the auction data
const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 200,
    renderCell: (params) => (
      <a href={`/dashboard/auction/bid/${params.value}`} style={{ textDecoration: 'underline', color: 'blue' }}>
        {params.value}
      </a>
    ),
  },
  { field: 'title', headerName: 'Title', width: 100 },

  { field: 'startPrice', headerName: 'Start Price', type: 'number', width: 120 },
  { field: 'currentBid', headerName: 'Current Bid', type: 'number', width: 120 },
  { field: 'category', headerName: 'Category', width: 150 },
  {
    field: 'expiresAt',
    headerName: 'Expires At',
    width: 150,
    valueFormatter: (params) => timestampToReadable(params),
  },
  { field: 'isPremium', headerName: 'Is Premium', type: 'boolean', width: 120 },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 150,
    valueFormatter: (params) => timestampToReadable(params)
  },
  
];

// Reusable AuctionTable component
export default function AuctionTable({ data, loading }: AuctionTableProps) {
  // Transform the GraphQL response data into rows for the DataGrid
  const rows = data?.trendingAuctions.map((auction) => ({
    ...auction,
    expiresAt: auction.expiresAt,//new Date(parseInt(auction.expiresAt)).toUTCString(),
    createdAt: auction.createdAt,
  })) || [];

  return (
    <div style={{ height: 520, width: 900, overflowX:'scroll' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        disableRowSelectionOnClick
        
      />
    </div>
  );
}