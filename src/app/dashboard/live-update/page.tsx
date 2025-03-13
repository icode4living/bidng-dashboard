"use client";

import { useState } from "react";
import { gql, useSubscription } from "@apollo/client";
import { motion, AnimatePresence } from "framer-motion";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

// ✅ Define GraphQL Subscription
const AUCTION_UPDATED_SUBSCRIPTION = gql`
  subscription {
    auctionUpdated {
      id
      title
      currentBid
      expiresAt
    }
  }
`;

const LiveAuctions = () => {
  const [auctions, setAuctions] = useState<any[]>([]);

  // ✅ Use Apollo useSubscription Hook
  const { data } = useSubscription(AUCTION_UPDATED_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("data",data)

      if (data) {
        const updatedAuction = subscriptionData.data.auctionUpdated;

        setAuctions((prev) => [
          ...prev.filter((a) => a._id !== updatedAuction._id),
          updatedAuction,
        ]);
      }
    },
  });

  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center text-yellow-400">🔥 Live Auctions</h2>
        <AnimatePresence>
          {auctions.length === 0 ? (
            <p className="text-center text-gray-400">No live auctions yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {auctions.map((auction) => (
                <motion.div
                  key={auction._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-800 p-4 rounded-lg shadow-lg border border-yellow-500"
                >
                  <h3 className="text-xl font-semibold text-yellow-300">{auction.title}</h3>
                  <p className="text-gray-400 mt-1">
                    Current Bid:{" "}
                    <span className="text-green-400 font-bold text-lg">NGN{auction.currentBid}</span>
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Ends in:{" "}
                    <span className="text-red-400">
                      {Math.floor((new Date(auction.expiresAt).getTime() - new Date().getTime()) / (1000 * 60))} mins
                    </span>
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-md shadow-md transition"
                    >
                      Place Bid
                    </motion.button>
                    <span className="text-gray-400 text-sm">
                      🏆 Top Bidder: <span className="text-green-300">{auction.winner}</span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </DefaultLayout>
  );
};

export default LiveAuctions;
