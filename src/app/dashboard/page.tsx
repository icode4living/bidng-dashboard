'use client'

import dynamic from 'next/dynamic'

export default function SendPackage(){
 
    const Dashboard = dynamic(() => import('./page_component'), {
      ssr: false,
    })
return(
    < Dashboard/>
)
}