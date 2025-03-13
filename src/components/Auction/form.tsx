"use client";

import React, { useEffect, useState } from "react";
import { gql } from "@/__generated__/gql";
import { useMutation } from "@apollo/client";
import dynamic from "next/dynamic";
import Select from "../ui/Form/Select";
import Input from "../ui/Form/Input";
import Loader from "@/components/common/Loader";

// Dynamically import DatePickerOne to ensure it's only loaded on the client
const DatePickerOne = dynamic(() => import("@/components/FormElements/DatePicker/DatePickerOne"), {
  ssr: false,
});

// ✅ FIX: Ensure the mutation matches the expected input structure
const CREATE_AUCTION_MUTATION = gql(/* GraphQL */ `
  mutation CreateAuction(
    $title: String!
    $description: String
    $category: String!
    $image: String!
    $startDate: String!
    $startPrice: Float!
    $expiresAt: String!
    $isPremium: Boolean
  ) {
    createAuction(
      title: $title
      description: $description
      category: $category
      image: $image
      startDate: $startDate
      startPrice: $startPrice
      expiresAt: $expiresAt
      isPremium: $isPremium
    ) {
      id
      sku
      isPremium
      description
    }
  }
`);

const AuctionForm=()=> {
  const [isloading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [startPrice, setStartPrice] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [expireAtDate, setExpireAtDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  // ✅ FIX: Correct mutation call by passing variables directly
  const [createAuction, { error, data }] = useMutation(CREATE_AUCTION_MUTATION, {
    errorPolicy: "all",
  });
  
  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion" },
    { value: "home", label: "Home" },
  ];

  async function handleSubmit() {
    setLoading(true);
    try {
      await createAuction({
        variables: {
          title,
          description,
          category,
          image,
          startDate,
          startPrice: parseFloat(startPrice), // Ensure it's a Float
          expiresAt: expireAtDate,
          isPremium,
        },
      });

      if (data?.createAuction) {
        alert(`Auction created with SKU: ${data.createAuction.sku}`);
        location.reload();
      }
    } catch (err) {
      console.error("Auction creation error:", err);
      alert(`Error uploading auction: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-12 bg-white shadow-sm space-x-4 dark:bg-boxdark dark:text-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
          <Input label="Title" name="title" type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Enter auction title" />
          <Input label="Description" name="description" type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Enter auction description" />
          <Input label="Start Price" name="start_price" type="number" onChange={(e) => setStartPrice(e.target.value)} placeholder="Enter starting price" />
          <Select label="Category" options={categories} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <DatePickerOne label="Start Date" value={startDate} onChange={setStartDate} />
          <DatePickerOne label="Expire At" value={expireAtDate} onChange={setExpireAtDate} />
        </div>
        <div className="mb-4">
          <Input label="Image" name="image" type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Enter image URL" />
          <div>
            <label htmlFor="checkboxLabelOne" className="flex cursor-pointer select-none items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  id="checkboxLabelOne"
                  className="sr-only"
                  onChange={() => setIsPremium(!isPremium)}
                />
                <div className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${isPremium && "border-primary bg-gray dark:bg-transparent"}`}>
                  <span className={`h-2.5 w-2.5 rounded-sm ${isPremium && "bg-primary"}`}></span>
                </div>
              </div>
              Checkbox Text
            </label>
          </div>
        </div>
        <div className="mb-5">
          <input
            type="submit"
            value="Submit"
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
          />
        </div>
      </form>
    </div>
  );
}

export default AuctionForm;