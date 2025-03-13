"use client";

import { Suspense } from "react";
import OrderDetails from "../../components/OrderDetails";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useParams } from "next/navigation";

export default function OrderDetailPage() {
    const params = useParams(); // Get dynamic route params
    const order_Id = params?.order_Id as string | undefined; // Ensure it's a string

    if (!order_Id) {
        return <p>Error: Order ID is missing.</p>;
    }

    return (
        <Suspense fallback="Getting data..">
            <DefaultLayout>
                <OrderDetails id={order_Id} />
            </DefaultLayout>
        </Suspense>
    );
}
