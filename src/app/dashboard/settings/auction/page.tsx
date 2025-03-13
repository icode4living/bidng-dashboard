"use client"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import axios from "axios";
import { useEffect, useState } from "react";

interface AuctionSettings {
  isAuctionEnabled: boolean;
  isAutoBiddingEnabled: boolean;
}

interface DashboardProps {
  settings: AuctionSettings;
}

const AuctionSetting: React.FC<DashboardProps> = ({ settings }) => {
  const [auctionEnabled, setAuctionEnabled] = useState(settings?.isAuctionEnabled);
  const [autoBiddingEnabled, setAutoBiddingEnabled] = useState(settings?.isAutoBiddingEnabled);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (field: "isAuctionEnabled" | "isAutoBiddingEnabled", value: boolean) => {
    setLoading(true);
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });

      if (!response.ok) throw new Error("Failed to update settings");

      if (field === "isAuctionEnabled") setAuctionEnabled(value);
      if (field === "isAutoBiddingEnabled") setAutoBiddingEnabled(value);
    } catch (error) {
      console.error("Error updating settings:", error);
    }
    setLoading(false);
  };
useEffect(()=>{
   axios.get("/api/settings")
  .then((resp)=>{
    console.log(resp)
    setAuctionEnabled(resp.data.isAuctionEnabled)
    setAutoBiddingEnabled(resp.data.isAutoBiddingEnabled)
  }).catch((err)=>{
    console.log(err)
  })
})
  return (
    <DefaultLayout>
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Auction Settings</h2>

      {/* Toggle Auction */}
      <div className="flex items-center justify-between mb-4">
        <span>Auction Enabled</span>
        <button
          onClick={() => handleToggle("isAuctionEnabled", !auctionEnabled)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
            auctionEnabled ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform ${
              auctionEnabled ? "translate-x-6" : "translate-x-0"
            } transition-transform`}
          />
        </button>
      </div>

      {/* Toggle Auto-Bidding */}
      <div className="flex items-center justify-between">
        <span>Auto-Bidding Enabled</span>
        <button
          onClick={() => handleToggle("isAutoBiddingEnabled", !autoBiddingEnabled)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
            autoBiddingEnabled ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform ${
              autoBiddingEnabled ? "translate-x-6" : "translate-x-0"
            } transition-transform`}
          />
        </button>
      </div>

      {loading && <p className="text-sm text-gray-500 mt-3">Updating settings...</p>}
    </div>
    </DefaultLayout>
  );
};

export default AuctionSetting;

