"use client";

import React, { Suspense } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CategoryForm from "@/app/dashboard/components/form/CategoryForm";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";



const Auction: React.FC = () => {
  
  

return(
<DefaultLayout>
  <Suspense>
  <Breadcrumb pageName='Create Category' />

  <CategoryForm/>
  </Suspense>
          </DefaultLayout>
    
  );
}

export default Auction;