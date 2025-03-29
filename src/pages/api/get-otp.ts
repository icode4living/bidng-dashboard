import ApiClient from '@/utils/api-client';
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import type {NextApiRequest, NextApiResponse} from "next";

export default async function getOtp(
    req: NextApiRequest,
    res: NextApiResponse,) {
 const apiKey = process.env.API_KEY
const baseURL = process.env.API_BASE_URL

try{
   const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user?.token) {
        console.log("session error")
        return res.status(401).json({ message: "Unauthorized: No session token" });
    }
    const apiClient = new ApiClient(baseURL!,apiKey, session!.user?.token);

 const response = await apiClient.postRequest(`/admin/requst-otp`,{
    email:session.user?.email,
    reason:"voucher"
 });
 if(response.status === 401){
    res.redirect('/auth/signin')
    }
 res.status(200).json({"message":"otp sent"})

}catch(err){
    console.log(err)
    res.status(500).json({"error":"Failed to delete user"})


}
    }