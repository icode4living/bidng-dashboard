import ApiClient from '@/utils/api-client';

import SessionHelper from '@/utils/session-helper';
import type {NextApiRequest, NextApiResponse} from "next";

export default async function login(
    req: NextApiRequest,
    res: NextApiResponse,) {
 const apiKey = process.env.API_KEY
const baseURL = process.env.API_BASE_URL
const session = await SessionHelper.getSessionData(req, res)

const Id = req.body.auctionId
const apiClient = new ApiClient(baseURL!,apiKey, session.token);
try{
 const response =await apiClient.deleteRequest(`/admin/delete/${Id}`,{
    id:Id
 });
if(response.status === 401){
res.redirect('/auth/signin')
}
 res.status(200).json({"message":"Auction Deleted"})
return;
}

catch(err){
    console.log(err)
    res.status(500).json({"error":"Failed to delete user"})


}
    }