import ApiClient from '@/utils/api-client';

import SessionHelper from '@/utils/session-helper';
import type {NextApiRequest, NextApiResponse} from "next";

export default async function getOtp(
    req: NextApiRequest,
    res: NextApiResponse,) {
 const apiKey = process.env.API_KEY
const baseURL = process.env.API_BASE_URL
const session = await SessionHelper.getSessionData(req, res)

const apiClient = new ApiClient(baseURL!,apiKey, session.token);
try{
 const response = await apiClient.postRequest(`/admin/requst-otp`,{
    email:session.email,
    reason:"voucher"
 });
 console.log(session.email)
 if(response.status === 401){
    res.redirect('/auth/signin')
    }
 res.status(200).json({"message":"otp sent"})

}catch(err){
    console.log(err)
    res.status(500).json({"error":"Failed to delete user"})


}
    }