import ApiClient from '@/utils/api-client';
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import SessionHelper from '@/utils/session-helper';
import type {NextApiRequest, NextApiResponse} from "next";

export default async function login(
    req: NextApiRequest,
    res: NextApiResponse,) {
 const apiKey = process.env.API_KEY
const baseURL = process.env.API_BASE_URL
console.log(req.body)

const Id = req.body.id
const status = req.body.status
console.log(status)
//const apiClient = new ApiClient(baseURL!,apiKey, session.token);
try{
      const session = await getServerSession(req, res, authOptions);
        
            if (!session || !session.user?.token) {
                console.log("session error")
                return res.status(401).json({ message: "Unauthorized: No session token" });
            }
        const apiClient = new ApiClient(baseURL!,apiKey, session.user?.token);
 const response =await apiClient.putRequest(`/admin/update-order/${Id}`,{
    status
 });
if(response.status === 401){
res.status(401)
}
 res.status(200).json({"message":"Auction Deleted"})
return;
}

catch(err){
    console.log(err)
    res.status(500).json({"error":"Failed to delete user"})


}
    }