import ApiClient from '@/utils/api-client';
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import axios from 'axios';
import type {NextApiRequest, NextApiResponse} from "next";
import { responseHandler } from './update-auction';

export default async function validateOtp(
    req: NextApiRequest,
    res: NextApiResponse,) {
 const apiKey = process.env.API_KEY
const baseURL = process.env.API_BASE_URL
//const session = await SessionHelper.getSessionData(req, res)
console.log(req.body)
const {otp} = req.body
//const apiClient = new ApiClient(baseURL!,apiKey, session.token);
try{
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user?.token) {
      console.log("session error")
      return res.status(401).json({ message: "Unauthorized: No session token" });
  }
  const apiClient = new ApiClient(baseURL!,apiKey, session.user?.token);
 const response =await apiClient.postRequest(`/admin/validate-otp`,{
   userId:session.user.id,
   otp
 });


responseHandler(response, res)

}

catch(err){
    console.log(JSON.stringify(err))
    res.status(500).json({"error":"Failed to delete user"})


}
    }

