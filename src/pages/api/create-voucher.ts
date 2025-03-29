
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import ApiClient from "@/utils/api-client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function createVoucher(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session || !session.user?.token) {
      return res.status(401).json({ error: "Unauthorized. Redirecting to login..." });
    }

    const apiKey = process.env.API_KEY;
    const baseURL = process.env.API_BASE_URL;

    const { userId, value, expiresAt, appliesTo } = req.body;
    
    const apiClient = new ApiClient(baseURL!, apiKey, session.user.token);

    const response = await apiClient.postRequest(`/voucher/create`, {
      userId,
      value,
      expiresAt,
      createdBy: session.user.email, // Fetch email from session
      appliesTo,
    });

    if (response.status === 401) {
      return res.status(401).json({ error: "Session expired. Please log in again." });
    }

    console.log("Voucher created:", response);
    res.status(200).json({ message: "Voucher Created!" });
  } catch (err) {
    console.error("Error creating voucher:", err);
    res.status(500).json({ error: "Failed to create voucher" });
  }
}


/*import ApiClient from '@/utils/api-client';

import SessionHelper from '@/utils/session-helper';
import { idID } from '@mui/material/locale';
import axios from 'axios';
import type {NextApiRequest, NextApiResponse} from "next";

export default async function createVoucher(
    req: NextApiRequest,
    res: NextApiResponse,) {
 const apiKey = process.env.API_KEY
const baseURL = process.env.API_BASE_URL
const session = await SessionHelper.getSessionData(req, res)
console.log(req.body)
const {userId, value,
    expiresAt,appliesTo} = req.body
const apiClient = new ApiClient(baseURL!,apiKey, session.token);
try{
 const response =await apiClient.postRequest(`/voucher/create`,{
    userId, 
    value,
    expiresAt,
    createdBy:session.email,
    appliesTo
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


    function generateStrongPassword(length: number = 8): string {
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";
      
        const allChars = uppercase + lowercase + numbers + specialChars;
      
        let password = "";
      
        // Ensure at least one character from each category
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += specialChars[Math.floor(Math.random() * specialChars.length)];
      
        // Fill remaining length with random characters from all categories
        for (let i = password.length; i < length; i++) {
          password += allChars[Math.floor(Math.random() * allChars.length)];
        }
      
        // Shuffle the password to make it more random
        return password.split('').sort(() => Math.random() - 0.5).join('');
      }
        
      const password = generateStrongPassword();
      console.log(password);
      */
      
      // Example Usage
       // Example Output: "Ab3@Xy1#"
      