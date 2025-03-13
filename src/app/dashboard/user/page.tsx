'use client'
import dynamic from 'next/dynamic'

export default function SendPackage(){
 
    const User = dynamic(() => import('./page_component'), {
      ssr: false,
    })
return(
    <User/>
)
}