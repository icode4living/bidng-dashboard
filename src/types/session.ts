export interface SessionData{
    user: string;
    email:string;
    isLoggedIn: boolean;
    permission:string;
    token:string;
}

export const defaultSession: SessionData = {
    user: "",
    email:"",
    isLoggedIn: false,
    permission:'',
    token:''
  };