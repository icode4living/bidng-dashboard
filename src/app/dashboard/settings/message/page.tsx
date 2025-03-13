"use client"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
/*import { Suspense, useEffect, useState } from "react";
import { gql } from "@apollo/client/core";
import graphqlHelper from "@/utils/graphqlClient";
*/
import MessageSendingComponent from "../../components/Message";
import InboxData from "../../components/MessageDataComponent";

export default function MessageBox(){

    return(
<DefaultLayout>
  <div className="mx-auto max-w-1/2">
  <MessageSendingComponent />
  <InboxData/>
  </div>
</DefaultLayout>

    )


}