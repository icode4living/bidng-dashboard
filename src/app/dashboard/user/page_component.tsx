'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";


import UserTable from "../components/UserTable";
import { gql } from "@apollo/client/core";
import { use, useEffect, useState } from "react";
import graphqlHelper from "@/utils/graphqlClient";
const GET_USER = gql`
  query GetUser{
    getUsers {
        id
        name
        email
        phone
        tickets
        badges
        createdAt
        updatedAt
    }
  }
`;

const UserData = () => {
const loading = false;
const [users, setUsers] = useState()
async function getUsers() {
    const data = await graphqlHelper.executeQuery(GET_USER)
setUsers(data)
}
useEffect(()=>{
    getUsers()
},[])
return(
            <DefaultLayout>
<div className="mx-auto max-w-242.5">
<Breadcrumb pageName="User" />

<div className="overflow-hidden">
<UserTable data={users} loading={loading} />
</div>
                </div>
                </DefaultLayout>

    );
};

export default UserData;