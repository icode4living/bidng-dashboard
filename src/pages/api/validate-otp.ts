import ApiClient from '@/utils/api-client';

import SessionHelper from '@/utils/session-helper';
import { idID } from '@mui/material/locale';
import axios from 'axios';
import type {NextApiRequest, NextApiResponse} from "next";

export default async function validateOtp(
    req: NextApiRequest,
    res: NextApiResponse,) {
 const apiKey = process.env.API_KEY
const baseURL = process.env.API_BASE_URL
const session = await SessionHelper.getSessionData(req, res)
console.log(req.body)
const {otp} = req.body
const apiClient = new ApiClient(baseURL!,apiKey, session.token);
try{
 const response =await apiClient.postRequest(`/admin/validate-otp`,{
   userId:session.user,
   otp
 });


if(response.status === 401){
res.status(401)
}
console.log(response)
 res.status(200).json({"message":`User Created!`})
return;
}

catch(err){
    console.log(JSON.stringify(err))
    res.status(500).json({"error":"Failed to delete user"})


}
    }

