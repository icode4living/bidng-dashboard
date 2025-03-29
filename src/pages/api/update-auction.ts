import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import axios from 'axios';
import type {NextApiRequest, NextApiResponse} from "next";

export default async function login(
    req: NextApiRequest,
    res: NextApiResponse,) {
 
console.log(req.body)

const Id = req.body.id
const auctions = req.body.variables
//console.log(auctions)
//const apiClient = new ApiClient(baseURL!,apiKey, session.token);
//console.log(session.token)
try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user?.token) {
        console.log("session error")
        return res.status(401).json({ message: "Unauthorized: No session token" });
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/update/${Id}`;
    const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        "Authorization": `Bearer ${session!.user?.token}`,
    };

    /*console.log("Sending request to:", apiUrl);
    console.log("Headers:", headers);*/

    const response = await axios.post(apiUrl, auctions, { headers });

    console.log("Auction Updated:", response.data);
    switch (response.status){
        case 401:
            return res.status(401).json({ message: "Session Expired" });
        case 200:
            return res.status(200).json({ message: "Auction Updated" });
        case 403:
            return res.status(403).json({ message: "Bad Request" });
        default:
            return res.status(204).json({ message: "operation not permitted" });




    }
   // return res.status(200).json({ message: "Auction Updated" });

} catch (error) {
    console.error("Update failed:", error);

    if (axios.isAxiosError(error) && error.response) {
        return res.status(error.response.status).json({ message: error.response.data });
    }

    return res.status(403).json({ message: "Bad Request!" });
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
    
export function responseHandler(resp:any, nextResp:NextApiResponse, title?:string){
    switch (resp.status){
        case 401:
            return nextResp.status(401).json({ message: `Session Expired` });
        case 200:
            return nextResp.status(200).json({ message: `${title||""}  Operation success! `});
        case 403:
            return nextResp.status(403).json({ message: "Bad Request" });
        
        case 404:
            return nextResp.status(404).json({ message: "Resources not found" });

        default:
            return nextResp.status(500).json({ message: "operation not permitted" });
}
}