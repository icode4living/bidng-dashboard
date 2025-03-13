import * as React from 'react';
import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';
import timestampToReadable from '@/utils/timeFormat';

// Define theTransaction interface
export interface Transaction {
    id:string;
    ref:string;
    type:string;
    status:string;
    gateway:string;
    amount:number;
    currency:string;
    timestamp:string;
    cardPan:string;
    accountDetails:string;
    
}

// Define the props for theTransactionTable component
interface TransactionTableProps {
  data: { getTransactionsByDate:Transaction[] };
  loading: boolean;
}

// Define the columns for theTransaction data
const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 200,
    
  },
  { field: 'ref', headerName: 'Txn_Ref', width: 200 },
  { field: 'types', headerName: 'Txn_Type', width: 200 },

  { field: 'status', headerName: 'Status', width: 300 },
  { field: 'gateway', headerName: 'Pay_Gateway', type: 'number', width: 120 },
  { field: 'amount', headerName: 'Amount', type: 'number', width: 120 },
  { field: 'currency', headerName: 'Currency', width: 150 },
  { field: 'cardPan', headerName: 'Card_pan', width: 150 },
  { field: 'accountDetails', headerName: 'Debit_Account', width: 150 },

  {
    field: 'timestamp',
    headerName: 'DateTime',
    width: 150,
    valueFormatter: (params) => timestampToReadable(params)
  },
  
];

// ReusableTransactionTable component
export default function TransactionTable({ data, loading }:TransactionTableProps) {
  // Transform the GraphQL response data into rows for the DataGrid
  const rows = data?.getTransactionsByDate.map((auction) => ({
    ...auction,
  
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