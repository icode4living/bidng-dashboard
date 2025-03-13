"use client"
import ECommerce from "@/components/Dashboard/E-commerce";
//import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ApolloProviderWrapper from "@/lib/AppolloProvider";



export default function Home() {
  return (
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
  );
}
