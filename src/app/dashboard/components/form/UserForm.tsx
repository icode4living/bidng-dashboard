"use client"
import TransferList from "./TransferList";
import Image from "next/image";
//import DefaultLayout from "@/components/Layouts/DefaultLayout";

import graphqlHelper from "@/utils/graphqlClient";
import {gql} from '@apollo/client'
import { useEffect, useState } from "react";
import timestampToReadable from "@/utils/timeFormat";
import axios from "axios";
const GET_USER_BY_ID = gql`
  query GetUserById($id:ID!){
  getUserById(id:$id){
    id
        name
        email
        phone
        permissions
        tickets
        badges
        createdAt
        updatedAt
  }
  }
`;


interface User{
    id:string;
    name: string;
    phone:string;
    email:string;
    permissions:string[];
    ticket:0;
    createdAt:string;
    badges: string[];
}
export default function UserDetail({id}:{id:string}){
    const [isLoading, setIsLoading] = useState<boolean>(false);

 const [data, setData] = useState<User>();
 const [assignedPermissions, setAssignedPermissions] = useState<string[]>()  
  //permissions
  const allPermissions = [
    'read:user',
    'write:user',
    'delete:user',
    'update:auction',
    'update:auction',
    'write:auction',
  ];

function deleteUser(){

    let con = confirm("Delete User?")
    if (con){
        setIsLoading(true)

        axios.post('/api/delete-user',{

            userId:data?.id
        }).then(()=>{
            alert('User deleted')
            setIsLoading(false);
            location.replace('/dashboard/user')

        }).catch((err)=>{
            alert("Operation falied")
console.log(err)
        })
    }
    }
    
   async function fetchUser(){

    setIsLoading(true)
   // if(title.)
    try {
        const variables = {
       id:id
        };
    
        const userData = await graphqlHelper.executeQuery(GET_USER_BY_ID, variables);
        //alert("Auction Created");
console.log(data);
setData(userData?.getUserById)
        //location.reload();

      } catch (error) {

        console.error("Error creating auction:", error);
      }
    }

      useEffect(() => {
         fetchUser().then(()=>{
            //setAssignedPermissions(data?.permissions)
         })

       }, []);
       function handlePermissionsChange(newAssignedPermissions: string[]){
        setAssignedPermissions(newAssignedPermissions);
      };
  return (
    <>
  
  <div className="mx-auto max-w-270">
{data &&
<div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative z-20 h-35 md:h-65">
           <Image
              src={"/images/cover/cover-01.png"}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
              width={970}
              height={260}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
            </div>
            <div className="relative">
            <button
                      className="bg-red-500 absolute top-10 right-10 rounded border border-stroke px-6 py-2 font-medium text-white hover:shadow-1 dark:border-strokedark dark:text-white"
                      onClick={()=>{deleteUser()}}
                    >
                      {isLoading ? "Delete User": 
                      "Please wait.."}
                    </button>
                </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
           
            </div>
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {data.name}
              </h3>
              <p className="font-medium">{data?.email}</p>
              <div className="mx-auto mb-5.5 mt-4.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                { data?.badges.map((badge)=>(
                <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  
                </span>
                <span className="text-sm">{badge}</span>
              </div>
            ))}
                {/*<div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white">
                    129K
                  </span>
                  <span className="text-sm">Followers</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white">
                    2K
                  </span>
                  <span className="text-sm">Following</span>
                </div>*/}
              </div>

              <div className="mx-auto max-w-180">
                <h4 className="font-semibold text-black dark:text-white">
                  About 
                </h4>
                <div className="mx-auto mb-5.5 mt-4.5 grid max-w-180 grid-cols-2 py-2.5 shadow-1 ">

                <div className="flex flex-col items-center justify-center gap-1 px-4 dark:border-strokedark xsm:flex-row">
                    
                <span className="font-semibold text-black dark:text-white">
                  Date Joined:
                  </span>
                  <span className="text-sm">{`${timestampToReadable(data.createdAt)}`}</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-4 dark:border-strokedark xsm:flex-row">
                    
                <span className="font-semibold text-black dark:text-white">
                  Phone:
                  </span>
                  <span className="text-sm">{data.phone}</span>
                </div>
              </div>
              </div>

             
              </div>
            </div>
          </div>
}



        </div>

       {/* <TransferList allPermissions={allPermissions} 
initialAssignedPermissions={assignedPermissions!}
onChange={handlePermissionsChange}
/>*/}
      
        </>
  );
};

