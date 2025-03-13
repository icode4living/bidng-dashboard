import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { darken, lighten, styled, Theme } from '@mui/material/styles';

const getBackgroundColor = (color: string, theme: Theme, coefficient: number) => ({
  backgroundColor: darken(color, coefficient),
  ...theme.applyStyles('light', {
    backgroundColor: lighten(color, coefficient),
  }),
});

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .super-app-theme--Open': {
    ...getBackgroundColor(theme.palette.info.main, theme, 0.7),
    '&:hover': {
      ...getBackgroundColor(theme.palette.info.main, theme, 0.6),
    },
    '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    fontSize: '1rem',
  },
    '&.Mui-selected': {
      ...getBackgroundColor(theme.palette.info.main, theme, 0.5),
      '&:hover': {
        ...getBackgroundColor(theme.palette.info.main, theme, 0.4),
      },
    },
  },
  '& .super-app-theme--Filled': {
    ...getBackgroundColor(theme.palette.success.main, theme, 0.7),
    '&:hover': {
      ...getBackgroundColor(theme.palette.success.main, theme, 0.6),
    },
    '&.Mui-selected': {
      ...getBackgroundColor(theme.palette.success.main, theme, 0.5),
      '&:hover': {
        ...getBackgroundColor(theme.palette.success.main, theme, 0.4),
      },
    },
  },
  '& .super-app-theme--PartiallyFilled': {
    ...getBackgroundColor(theme.palette.warning.main, theme, 0.7),
    '&:hover': {
      ...getBackgroundColor(theme.palette.warning.main, theme, 0.6),
    },
    '&.Mui-selected': {
      ...getBackgroundColor(theme.palette.warning.main, theme, 0.5),
      '&:hover': {
        ...getBackgroundColor(theme.palette.warning.main, theme, 0.4),
      },
    },
  },
  '& .super-app-theme--Rejected': {
    ...getBackgroundColor(theme.palette.error.main, theme, 0.7),
    '&:hover': {
      ...getBackgroundColor(theme.palette.error.main, theme, 0.6),
    },
    '&.Mui-selected': {
      ...getBackgroundColor(theme.palette.error.main, theme, 0.5),
      '&:hover': {
        ...getBackgroundColor(theme.palette.error.main, theme, 0.4),
      },
    },
  },
}));

// Generate dummy data for demonstration
const generateDummyData = () => {
  const rows = Array.from({ length: 100 }, (_, id) => ({
    id,
    name: `Item ${id + 1}`,
    status: ['Open', 'Filled', 'PartiallyFilled', 'Rejected'][Math.floor(Math.random() * 4)],
    value: Math.floor(Math.random() * 1000),
  }));

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'value', headerName: 'Value', width: 150 },
  ];

  return { rows, columns };
};

export default function StylingRowsGrid() {
  const { rows, columns } = generateDummyData();

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <StyledDataGrid
        rows={rows}
        getCellClassName={(params)=>'dark:text-white dark:bg-boxdark'}
        columns={columns}
        getRowClassName={(params) => `dark:text-white dark:bg-boxdark`}
      />
    </Box>
  );
}
