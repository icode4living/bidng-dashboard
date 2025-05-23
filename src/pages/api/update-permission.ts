import ApiClient from '@/utils/api-client';
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import type {NextApiRequest, NextApiResponse} from "next";
import { responseHandler } from './update-auction';

export default async function login(
    req: NextApiRequest,
    res: NextApiResponse,) {
 const apiKey = process.env.API_KEY
const baseURL = process.env.API_BASE_URL
//const session = await SessionHelper.getSessionData(req, res)
console.log(req.body)

const Id = req.body.id
const permissions = req.body.permision
console.log(apiKey)
//const apiClient = new ApiClient(baseURL!,apiKey, session.token);
try{
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user?.token) {
        console.log("session error")
        return res.status(401).json({ message: "Unauthorized: No session token" });
    }
    const apiClient = new ApiClient(baseURL!,apiKey, session.user?.token);
 const response =await apiClient.putRequest(`/admin/update-user/${Id}`,{
    permissions
 });
/*if(response.status === 401){
res.status(401)
}
 res.status(200).json({"message":"permision updated"})
return;*/
responseHandler(response, res)

}

catch(err){
    console.log(err)
    res.status(500).json({"error":"Failed to delete user"})


}
    }


