'use client'
import dynamic from 'next/dynamic'

export default function SendPackage(){
 
    const CreateUser = dynamic(() => import('./page_component'), {
      ssr: false,
    })
return(
    <CreateUser/>
)
}