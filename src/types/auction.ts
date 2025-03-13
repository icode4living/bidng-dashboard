export interface Auction {
  id: string;
  title: string;
  description: string;
  startPrice: number;
  currentBid: null | number; // Assuming it could be a number in the future
  category: null | string; // Assuming category might be a string
  slug: string;
  expiresAt: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuctionData {
  getAllAuctions: Auction[];
}

export interface AuctionDataStructure {
  data: AuctionData;
}

