
import dynamic from 'next/dynamic'

export default function SendPackage(){
 
    const  Voucher = dynamic(() => import('./page_component'), {
      ssr: false,
    })
return(
    <Voucher/>
)
}