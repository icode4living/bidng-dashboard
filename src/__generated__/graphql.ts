/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Auction = {
  __typename?: 'Auction';
  bids: Array<Bid>;
  category?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  currentBid?: Maybe<Scalars['Float']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  expiresAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  isPremium: Scalars['Boolean']['output'];
  quantity?: Maybe<Scalars['Int']['output']>;
  sku: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  startDate: Scalars['String']['output'];
  startPrice: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type AuctionInput = {
  category: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  expiresAt: Scalars['String']['input'];
  image: Scalars['String']['input'];
  isPremium?: InputMaybe<Scalars['Boolean']['input']>;
  startDate: Scalars['String']['input'];
  startPrice: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type Bid = {
  __typename?: 'Bid';
  amount: Scalars['Float']['output'];
  phone: Scalars['String']['output'];
  ticketNumber: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  updatedBy?: Maybe<Scalars['ID']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAuction?: Maybe<Auction>;
  createCategory?: Maybe<Category>;
  createUser?: Maybe<User>;
  placeBid?: Maybe<Auction>;
  purchaseTicket: PurchaseTicketResponse;
  updateBid?: Maybe<Auction>;
};


export type MutationCreateAuctionArgs = {
  input: AuctionInput;
};


export type MutationCreateCategoryArgs = {
  image: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationPlaceBidArgs = {
  amount: Scalars['Float']['input'];
  auctionId?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
  ticketNumber?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationPurchaseTicketArgs = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  auctionId?: InputMaybe<Scalars['ID']['input']>;
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
};


export type MutationUpdateBidArgs = {
  auctionId?: InputMaybe<Scalars['String']['input']>;
  newAmount: Scalars['Float']['input'];
  ticketNumber?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type PurchaseTicketInput = {
  amount: Scalars['Float']['input'];
  auctionId: Scalars['ID']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type PurchaseTicketResponse = {
  __typename?: 'PurchaseTicketResponse';
  cashierUrl: Scalars['String']['output'];
  message: Scalars['String']['output'];
  reference: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAuctionById?: Maybe<Auction>;
  getAuctionBySlug?: Maybe<Auction>;
  getAuctions: Array<Auction>;
  getBid?: Maybe<Array<Maybe<Bid>>>;
  getCategory: Array<Category>;
  getCategoryById?: Maybe<Category>;
  getTicketById?: Maybe<Ticket>;
  getTickets: Array<Ticket>;
  getUserById?: Maybe<User>;
  getUsers: Array<User>;
};


export type QueryGetAuctionByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAuctionBySlugArgs = {
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAuctionsArgs = {
  isPremium?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetCategoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetCategoryByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTicketByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTicketsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  highestBidderUpdated?: Maybe<Auction>;
  leaderboardUpdated?: Maybe<Array<Bid>>;
  outbidNotification?: Maybe<Scalars['String']['output']>;
};


export type SubscriptionHighestBidderUpdatedArgs = {
  auctionId: Scalars['String']['input'];
};


export type SubscriptionLeaderboardUpdatedArgs = {
  auctionId: Scalars['String']['input'];
};


export type SubscriptionOutbidNotificationArgs = {
  userId: Scalars['String']['input'];
};

export type Ticket = {
  __typename?: 'Ticket';
  amount?: Maybe<Scalars['Float']['output']>;
  auctionId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  expiredAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  paymentGateway: Scalars['String']['output'];
  paymentStatus: Scalars['String']['output'];
  ticketNumber: Scalars['String']['output'];
  txnRef: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  badges: Array<Scalars['String']['output']>;
  category: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  permissions: Array<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  tickets: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};
