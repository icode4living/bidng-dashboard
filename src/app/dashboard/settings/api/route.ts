import ApiClient from "@/utils/api-client";
import { GetServerSideProps } from "next";
import { getIronSession } from "iron-session";
import { SessionData } from "@/types/session";
import { cookies } from "next/headers";


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getIronSession<SessionData>(req, res, {
      password: process.env.SESSION_SECRET as string,
      cookieName: process.env.COOKIE_NAME as string,
    });
  
    if (!session.token) {
      return {
        redirect: {
          destination: "/auth/signin",
          permanent: false,
        },
      };
    }
  
    const apiKey = process.env.API_KEY;
    const baseURL = process.env.API_BASE_URL;
  
    const api = new ApiClient(baseURL || "", apiKey, session.token);
  
    try {
      const settings = await api.getRequest("/auction-settings"); // Ensure correct endpoint for fetching settings
      return { props: { settings } };
    } catch (error) {
      console.error("Failed to fetch auction settings:", error);
      return { props: { settings: { isAuctionEnabled: false, isAutoBiddingEnabled: false } } };
    }
  };
  