"use client"
import * as React from 'react';
import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';
import timestampToReadable from '@/utils/timeFormat';
import axios from 'axios';
import { useState } from 'react';
// Define the Category interface
interface Category {
  id:string;
  name: string;
   createdAt: string;
}

// Define the props for the CategoryTable component
interface CategoryTableProps {
  data: { getCategory: Category[] };
  loading: boolean;
}

// Define the columns for the Category data


// Reusable CategoryTable component
export default function CategoryTable({ data, loading }: CategoryTableProps) {
  
  const [deleteCat,  setDelete] = useState<boolean>(false)

  // Transform the GraphQL response data into rows for the DataGrid
  const rows = data?.getCategory.map((category) => ({
    ...category,
    createdAt:new Date(parseInt(category.createdAt)).toLocaleString(),
  })) || [];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Action', width: 200 ,

    renderCell:(params) =>(
      <button className='bg-red-500  text-center
       text-white text-sm p-2 rounded-md'
      onClick={(e)=>{
        e.preventDefault()
        deleteCategory(params.id)
      }}>
        {deleteCat ? 'Deleting':'Delete'}
      </button>
    )
      
    
  },

  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'createdAt', headerName: 'Datetime', width: 200,
    //valueFormatter: (params) => new Date(parseInt(params).toString())//timestampToReadable(params)

   },

  
];
  function deleteCategory(id:string){
  let con = confirm("Delete Category?")
  //alert(con)
    if (!con)return;
    setDelete(true)

    axios.post('/api/delete-category',{

        categoryId:id
    }).then((resp)=>{
      switch (resp.status){
        case  401:
          alert(resp.data.message)
          setDelete(false)

          location.replace("/auth/signin");
          return
        case 200:
          alert(resp.data.message);
          setDelete(false)
          location.reload()
          return
        case 500:

          alert(resp.data.message);
          setDelete(false)

          return
        case 403:
          alert("Unauthorized")  
          setDelete(false)

          return
        default:
          alert("Operation not permitted for user");
          setDelete(false)

          break;
      }

    }).catch((err)=>{
        alert("Operation falied")
        setDelete(false)
console.log(err)
    })
    
    }
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

 