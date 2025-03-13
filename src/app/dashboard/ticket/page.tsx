'use client'

import dynamic from 'next/dynamic'

export default function SendPackage(){
 
    const Ticket = dynamic(() => import('./page_component'), {
      ssr: false,
    })
return(
    <Ticket/>
)
}