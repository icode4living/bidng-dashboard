import ApiClient from '@/utils/api-client';

import SessionHelper from '@/utils/session-helper';
import { idID } from '@mui/material/locale';
import axios from 'axios';
import type {NextApiRequest, NextApiResponse} from "next";

export default async function login(
    req: NextApiRequest,
    res: NextApiResponse,) {
 const apiKey = process.env.API_KEY
const baseURL = process.env.API_BASE_URL
const session = await SessionHelper.getSessionData(req, res)
console.log(req.body)

const Id = req.body.id
const auctions = req.body.variables
//console.log(auctions)
const apiClient = new ApiClient(baseURL!,apiKey, session.token);
//console.log(session.token)
try {
    if (!session || !session.token) {
        console.log("session error")
        return res.status(401).json({ message: "Unauthorized: No session token" });
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/update/${Id}`;
    const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        Authorization: `Bearer ${session.token}`,
    };

    console.log("Sending request to:", apiUrl);
    console.log("Headers:", headers);

    const response = await axios.post(apiUrl, auctions, { headers });

    console.log("Auction Updated:", response.data);
    return res.status(200).json({ message: "Auction Updated" });

} catch (error) {
    console.error("Update failed:", error);

    if (axios.isAxiosError(error) && error.response) {
        return res.status(error.response.status).json({ message: error.response.data });
    }

    return res.status(500).json({ message: "Server Error: Could not update auction" });
}
    }
/*try{
 const response =await apiClient.postRequest(`/admin/update/${Id}`,{
    auctions
 });
if(response.data?.status === 401){
    console.log(response)
res.status(401)
}
//console.log(`resp`,response)
 res.status(200).json({"message":"Auction Updated"})
return;
}

catch(err){
    console.log(err)
    res.status(500).json({"error":"Failed to delete user"})


}*/
    