import ApiClient from '@/utils/api-client';
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import type {NextApiRequest, NextApiResponse} from "next";
import { responseHandler } from './update-auction';

export default async function changePassword(
    req: NextApiRequest,
    res: NextApiResponse,) {
 const apiKey = process.env.API_KEY
const baseURL = process.env.API_BASE_URL
//console.log(req.body.oldPassword)
//const { data} = req.body
try{
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user?.token) {
        console.log("session error")
        return res.status(401).json({ message: "Unauthorized: No session token" });
    }
    const apiClient = new ApiClient(baseURL!,apiKey, session.user?.token);
//console.log(session.user?.id)
//console.log(`user`,session.user)
 const response =await apiClient.postRequest(`/auth/change-password`,{
    userId:session.user?.id,
   oldPassword:req.body.oldPassword,
   newPassword:req.body.newPassword
 });
 console.log(response)

responseHandler(response, res)
}

catch(err){
    console.log(err)
    res.status(500).json({"error":"Failed to delete user"})


}
    }