

import ApiClient from '@/utils/api-client';
import SessionHelper from '@/utils/session-helper';
import type { NextApiRequest, NextApiResponse } from "next";

export default async function settings(req: NextApiRequest, res: NextApiResponse) {
  try {
    const apiKey = process.env.API_KEY;
    const baseURL = process.env.API_BASE_URL;

    if (!baseURL || !apiKey) {
      console.error("❌ API_BASE_URL or API_KEY is missing in production.");
      return res.status(500).json({ error: "Server configuration issue." });
    }

    // Get session data
    const session = await SessionHelper.getSessionData(req, res);
    console.log(session)
    /*if (!session?.token) {
      console.warn("⚠️ No session token found.");
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }*/

    // Initialize API client
    const apiClient = new ApiClient(baseURL, apiKey, session.token);

    if (req.method === 'POST') {
      const { isAuctionEnabled, isAutoBiddingEnabled } = req.body;

      const response = await apiClient.patchRequest('/auction-settings', {
        isAuctionEnabled,
        isAutoBiddingEnabled
      });

      console.log("✅ Auction settings updated:", response.data);
      return res.status(200).json({ message: "Settings updated successfully." });

    } else if (req.method === 'GET') {
      const response = await apiClient.getRequest('/auction-settings');

      console.log("✅ Auction settings fetched:", response.data);
      return res.status(200).json(response.data);

    } else {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

  } catch (error: any) {
    console.error("❌ Error in settings API:", error.message);

    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
}
3

/*
*   req: NextApiRequest,
    res: NextApiResponse,) {
    
 //const  sessionHelper = new SessionHelper();
 const apiKey = process.env.API_KEY
 const baseURL = process.env.API_BASE_URL
 const session = await SessionHelper.getSessionData(req, res)

 const apiClient = new ApiClient(baseURL!,apiKey,session.token);
 const { isAuctionEnabled, isAutoBiddingEnabled} = req.body;
 //console.log(`api key: ${email}:${password}`)
console.log(req.method)
 try{
    if (req.method === 'POST'){
 const resp = await apiClient.patchRequest('/auction-settings',{
    isAuctionEnabled, 
    isAutoBiddingEnabled});   
    console.log(resp)    
    return res.status(200).send({data:"settings updated"})
}
else{
    const resp = await apiClient.getRequest('/auction-settings')
    console.log(resp)
    return res.status(200).send(resp.data)

}

}

catch(error){
    console.log(error)
    return {
        redirect: {
          destination: "/auth/signin",
          permanent: false,
        },
      };
} 
    */
