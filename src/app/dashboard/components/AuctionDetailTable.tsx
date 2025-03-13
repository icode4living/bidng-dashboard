'use client';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, TablePagination } from '@mui/material';
import { gql } from '@apollo/client/core';
import graphqlHelper from '@/utils/graphqlClient';

const GET_BIDS = gql`
query GetAuctionById($id: ID!) {
  getAuctionById(id: $id) {
    bids {
      userId
      amount
      timestamp
      ticketNumber
      phone
      image
      title
      slug
    }
  }
}`;

interface Bid {
  userId: string;
  amount: number;
  timestamp: string;
  ticketNumber: string;
  phone: string;
  image: string;
  title: string;
  slug: string | null;
}

export default function BidData({ id }: { id: string }) {
  const [data, setData] = useState<Bid[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    async function getBids() {
      try {
        const result = await graphqlHelper.executeQuery(GET_BIDS, { id });
        setData(result.getAuctionById?.bids || []);
      } catch (error) {
        console.error('Error fetching bids:', error);
      }
    }
    getBids();
  }, [id]);

  const filteredBids = data.filter(bid =>
    Object.values(bid).some(value =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <TableContainer component={Paper}>
      <div className="p-4">
        <TextField
          label="Search Bids"
          variant="outlined"
          className='py-6 mb-4 rounded w-max'
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Ticket Number</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredBids.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((bid, index) => (
            <TableRow key={index}>
              <TableCell>{bid.userId}</TableCell>
              <TableCell>{bid.amount}</TableCell>
              <TableCell>{new Date(parseInt(bid.timestamp)).toLocaleString()}</TableCell>
              <TableCell>{bid.ticketNumber}</TableCell>
              <TableCell>{bid.phone}</TableCell>
              <TableCell>
                <img src={bid.image} alt={bid.title} style={{ width: '50px', height: '50px' }} />
              </TableCell>
              <TableCell>{bid.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredBids.length}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
      />
    </TableContainer>
  );
}
