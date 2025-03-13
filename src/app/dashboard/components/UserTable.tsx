import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// Define the columns for the user data
const columns = [

  { field: 'id', headerName: 'ID', width: 200, 
    renderCell: (params: { value: string; }) => (
      <a href={`/dashboard/user/${params.value}`} style={{ textDecoration: 'underline', color: 'blue' }}>
        {params.value}
      </a>
    ),
   },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 120 },
  { field: 'phone', headerName: 'Mobile N0', width: 120 },
  { field: 'tickets', headerName: 'N0_Ticket', type:'number',width: 120 },
  { field: 'createdAt', headerName: 'Created At', width: 150 },
];

// Reusable userTable component
export default function UserTable({ data, loading }:{data:any,loading:boolean}) {
  // Transform the GraphQL response data into rows for the DataGrid
  const rows = data?.getUsers?.map((user:any) => ({
    id: user.id,
    name:user.name,
    email: user.email,
    phone: user.phone,
    tickets:user.tickets,
    createdAt: new Date(parseInt(user.createdAt)).toLocaleString(),
    userNumber: user.userNumber
  })) || [];

  return (
    <div className='dark:text-white' style={{ height: 520, width: '100%', overflowX:'scroll' }}>

      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        slots={{ toolbar: GridToolbar }}
        
        disableRowSelectionOnClick={false}
        rowModesModel={rows.id}
     />
    </div>
  );
}