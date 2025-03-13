import * as React from 'react';
import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';
import timestampToReadable from '@/utils/timeFormat';

// Define the Category interface
interface Category {
  name: string;
   createdAt: string;
}

// Define the props for the CategoryTable component
interface CategoryTableProps {
  data: { getCategory: Category[] };
  loading: boolean;
}

// Define the columns for the Category data
const columns: GridColDef[] = [

  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'createdAt', headerName: 'Datetime', width: 200,
    valueFormatter: (params) => new Date(parseInt(params).toLocaleString())//timestampToReadable(params)

   },

  
];

// Reusable CategoryTable component
export default function CategoryTable({ data, loading }: CategoryTableProps) {
  // Transform the GraphQL response data into rows for the DataGrid
  const rows = data?.getCategory.map((category) => ({
    ...category,
    createdAt: category.createdAt,
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