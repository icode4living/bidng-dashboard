import * as React from "react";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { useMediaQuery } from "@mui/material";
import timestampToReadable from "@/utils/timeFormat";

// Define the Inbox interface
export interface Inbox {
  type: string;
  createdAt: string;
  message: string;
  to:string;
}

// Define the props for MessageTable component
interface MessageTableProps {
  getInboxByDate: Inbox[];
  loading: boolean;
}

export default function MessageTable({ getInboxByDate, loading }: MessageTableProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Define columns with responsive widths
  const columns: GridColDef[] = [
    { field: "type", headerName: "Type", minWidth: 120, flex: 1 },
    { field: "message", headerName: "Message", type: "string", minWidth: 200, flex: 2 },
    { field: "to", headerName: "Recipient", type: "string", minWidth: 200, flex: 2 },

    {
      field: "createdAt",
      headerName: "Date/Time",
      minWidth: 150,
      flex: 1,
      //valueFormatter: (params) => timestampToReadable(params.value),
    },
  ];

  // Transform data to include a unique id
  const rows = getInboxByDate?.map((message, index) => ({
    id: message.createdAt || index, // Ensure a unique id
    ...message,
    createdAt: new Date(parseInt(message.createdAt)).toLocaleString(),

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
