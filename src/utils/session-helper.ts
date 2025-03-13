//import { IncomingMessage, ServerResponse } from "http";
import { getIronSession,IronSession,SessionOptions,  } from "iron-session";
import { SessionData } from "@/types/session";

// Session configuration
export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_SECRET!|| 'aBcDeFgHiJkLmNoPqRsTuVwXyZ123456', // Replace with a strong secret
    cookieName: process.env.COOKIE_NAME!|| 'myapp_session', // Replace with your cookie name
    cookieOptions: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    },
  };
  
  // Extend IronSessionData with your custom session data
  //interface UserSession extends IronSessionData, SessionData {}
  
  class SessionHelper {
    /**
     * Retrieves the session object.
     * @param req - The request object.
     * @param res - The response object.
     * @returns The session object.
     */
    static async getSession(req: any, res: any): Promise<IronSession<SessionData>> {
        const session =await getIronSession<SessionData>(req, res, sessionOptions);
return session
    }
  
    /**
     * Saves data to the session.
     * @param req - The request object.
     * @param res - The response object.
     * @param data - The session data to save.
     */
    static async saveSession(req: any, res: any, data: SessionData) {
        const session =await getIronSession<SessionData>(req, res, sessionOptions);
console.log(`env:${process.env.COOKIE_NAME}`)
//const user = data.user
        //const session = await this.getSession(req, res);
      session.user = data.user;
      session.email = data.email;
      session.isLoggedIn = data.isLoggedIn;
      session.permission = data.permission;
      session.token = data.token;
      //await session.save(); // Persist the session
    await  session.save();
    }
  
    /**
     * Destroys the session.
     * @param req - The request object.
     * @param res - The response object.
     */
    static async destroySession(req: any, res: any) {
      const session = await this.getSession(req, res);
      session.destroy(); // Destroy the session
    }
  
    /**
     * Retrieves data from the session.
     * @param req - The request object.
     * @param res - The response object.
     * @returns The session data or null if no data exists.
     */
    static async getSessionData(req: any, res: any): Promise<SessionData> {
      const session = await this.getSession(req, res);
      /*if (session.user && session.isLoggedIn && session.permission && session.token) {
        return {
          user: session.user,
          isLoggedIn: session.isLoggedIn,
          permission: session.permission,
          token: session.token,
        };
      }*/
        return {

            user: session.user,
            email:session.email,
            isLoggedIn: session.isLoggedIn,
            permission: session.permission,
            token: session.token,
          };
       // Return null if session data is incomplete
    }
  }
  
  export default SessionHelper;