'use client'

import Loader from "@/components/common/Loader";
import graphqlHelper from "@/utils/graphqlClient";
import { gql } from "@apollo/client/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
const GET_ORDER_BY_ID = gql `
query GetOrderById($id:ID!){
  getOrderById(id:$id){
    id
    amount
    name
    itemImage
    phone
    email
    quantity
    auctionId
    status
    orderNumber
    auctionTitle
    createdAt
    updatedAt
    }
    }
`

export interface OrderByIdProps {

      id: string;
      amount: number;
      name: string;
      itemImage: string;
      phone: string;
      email: string;
      status: string;
      auctionId: string;
      orderNumber:string;
      getOrderByIdNumber: string;
      auctionTitle: string;
      createdAt: string;
      updatedAt: string;
    };
  
interface Order{
  getOrderById:OrderByIdProps
}

export default function OrderDetails({id}:{id:string}){
 // const order.data.getOrderById = data?.getorder.data.getOrderByIdById;
 const [order, setOrder] = useState<Order>()
  const [status, setStatus] = useState<string>();
  const [orderId, setOrderId] = useState<string>();
const [loading, setLoading] = useState(false)
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    axios.post('/api/update-order',{
      id: orderId,
     status:status
  }).then(()=>{
      alert('Order Status Updated!')
      setLoading(false)
      location.reload();

  }).catch((err)=>{
      alert("Operation falied")
      setLoading(false)
console.log(err)
  })
    }
    async function getOrderById(){
      try{
        const auctionData:Order = await graphqlHelper.executeQuery(GET_ORDER_BY_ID,{id:id});
      setOrder(auctionData);
      setOrderId(auctionData.getOrderById.id)
   // console.log(auctionData)
    }

      catch(err){
console.log(err)
      }
  
    }
    useEffect(()=>{
      
      getOrderById();
    },[])
console.log(order)
  return (
    <>
    {loading ? <Loader/> : 
   <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
  <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img
            src={order?.getOrderById.itemImage || "https://via.placeholder.com/150"}
            alt={order?.getOrderById.auctionTitle || "Product Image"}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="md:w-2/3 md:pl-6">
          <h2 className="text-2xl font-bold mb-4">{order?.getOrderById.auctionTitle || "No Title"}</h2>
         <div className="space-y-2">

            <p><span className="font-semibold"> Number:</span> {order?.getOrderById.orderNumber || "N/A"}</p>
            <p><span className="font-semibold">Customer Name:</span>{order?.getOrderById.name || "N/A"}</p>
            <p><span className="font-semibold">Phone:</span> {order?.getOrderById.phone || "N/A"}</p>
            <p><span className="font-semibold">Email:</span> {order?.getOrderById.email || "N/A"}</p>
            <p><span className="font-semibold">Amount:</span> &#8358;{order?.getOrderById.amount?.toLocaleString() || "0"}</p>
            <p><span className="font-semibold">Status:</span> {order?.getOrderById.status || "N/A"}</p>
            <p><span className="font-semibold">Created At:</span> {order?.getOrderById.createdAt ? new Date(parseInt(order.getOrderById.createdAt)).toLocaleString() : "N/A"}</p>
            <p><span className="font-semibold">Updated At:</span> {order?.getOrderById.updatedAt ? new Date(parseInt(order.getOrderById.updatedAt)).toLocaleString() : "N/A"}</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-6">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Update Status
        </label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={handleStatusChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border.data.getOrderById-gray-300 focus:outline-none focus:ring-indigo-500 focus:border.data.getOrderById-indigo-500 sm:text-sm rounded-md"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Update Status
        </button>
      </form>
    </div>
}
    </>
  );
};


