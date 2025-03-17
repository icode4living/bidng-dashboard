import ApiClient from '@/utils/api-client';

import SessionHelper from '@/utils/session-helper';
import { idID } from '@mui/material/locale';
import type {NextApiRequest, NextApiResponse} from "next";
import { permission } from 'process';

export default async function login(
    req: NextApiRequest,
    res: NextApiResponse,) {
 const apiKey = process.env.API_KEY
const baseURL = process.env.API_BASE_URL
const session = await SessionHelper.getSessionData(req, res)
console.log(req.body)

const Id = req.body.id
const permissions = req.body.permision
console.log(apiKey)
const apiClient = new ApiClient(baseURL!,apiKey, session.token);
try{
 const response =await apiClient.putRequest(`/admin/update-user/${Id}`,{
    permissions
 });
if(response.status === 401){
res.status(401)
}
 res.status(200).json({"message":"permision updated"})
return;
}

catch(err){
    console.log(err)
    res.status(500).json({"error":"Failed to delete user"})


}
    }