import ApiClient from '@/utils/api-client';
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import SessionHelper from '@/utils/session-helper';
import { idID } from '@mui/material/locale';
import axios from 'axios';
import type {NextApiRequest, NextApiResponse} from "next";

export default async function login(
    req: NextApiRequest,
    res: NextApiResponse,) {
 const apiKey = process.env.API_KEY
const baseURL = process.env.API_BASE_URL
//const session = await SessionHelper.getSessionData(req, res)
console.log(req.body)
const {email, phone, name,permission} = req.body
//const apiClient = new ApiClient(baseURL!,apiKey, session.token);
try{
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user?.token) {
        return res.status(401).json({ error: "Unauthorized. Redirecting to login..." });
      }
      const apiClient = new ApiClient(baseURL!,apiKey, session.user.token);

    const PASSWORD= generateStrongPassword(8)
 const response =await apiClient.postRequest(`/auth/create-admin-user`,{
    email,
    phone,
name,
    permission,
    password:PASSWORD
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
      
      // Example Usage
      const password = generateStrongPassword();
      console.log(password); // Example Output: "Ab3@Xy1#"
      