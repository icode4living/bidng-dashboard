import ApiClient from '@/utils/api-client';

import SessionHelper from '@/utils/session-helper';
import axios from 'axios';
import type {NextApiRequest, NextApiResponse} from "next";

export default async function login(
    req: NextApiRequest,
    res: NextApiResponse,) {
    
 //const  sessionHelper = new SessionHelper();
 const apiKey = process.env.API_KEY
 const baseURL = process.env.API_BASE_URL
 const apiClient = new ApiClient(baseURL!,apiKey);
 const {email,password} = req.body;
 console.log(`api key: ${email}:${password}`)
try{
 const resp = await apiClient.postRequest('/admin/login',{
    identifier:email,
    password:password});
    /*const resp = await axios.post(`${process.env.API_BASE_URL}/auth/login`,{
        //header:{}
        data:{
            identifier:email,
    password:password
        }
    })*/
    console.log(resp)
if(resp.status ==200){
   await SessionHelper.saveSession(req,res,{
        user:resp.data.user._id,
        email:resp.data.user.email,
        isLoggedIn:true,
        permission:resp.data.user.permissions,
        token: resp.data.token
    })
   /*const session =await getIronSession<SessionData>(req, res, sessionOptions);
    session.user = resp.data.user._id;
    session.isLoggedIn =true;
    session.permission = resp.data.user.permissions;
    session.token =resp.data.token
   session.save()*/
    
    return res.status(200).send({data:"login success"})
}
else{
    return res.status(401).send({data:"invalid username or password"})

}
}
catch(error){
    console.log(error)
    return res.status(500).send({data:`internal server error ${error}`})

} 


    
}