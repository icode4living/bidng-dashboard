"use client";

import React, { Suspense, useEffect, useState } from "react";
import { gql } from "@/__generated__/gql";
import { useMutation } from "@apollo/client";
import dynamic from "next/dynamic";
import Select from "@/components/ui/Form/Select";
import AuctionForm from "@/app/dashboard/components/form/AuctionForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AuctionFormOne from "../components/form/AuctionFormOne";



const Auction: React.FC = () => {
  
  

return(
<DefaultLayout>
  <Suspense>
  <AuctionFormOne/>
  </Suspense>
          </DefaultLayout>
    
  );
}

export default Auction;