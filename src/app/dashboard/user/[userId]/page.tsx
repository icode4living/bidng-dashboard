//'use client'
import * as React from 'react'

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UserProfileForm from '../../components/form/UserProfileForm';
//import { useRouter } from 'next/router';

export default function UserDetails({params}){

   // const { userId } = await params

    return (
      <>
            <Breadcrumb pageName="User Details" />
    {/*<UserDetail id={userId}/>*/}
   { /*<UserPage user={userData} />*/}
   <UserProfileForm id={params.userId|| ''}/>
   </>   
      );
    };
    
    