import { ApolloClient, InMemoryCache,HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from '@apollo/client/utilities';

/*const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL || "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
  credentials: 'same-origin',  // Use 'same-origin' unless using different domains
  defaultOptions: {

  },
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "s3/24HiBtJ7h7aNqRlnAFg=="
  }
});*/
const httpLink = new HttpLink({ uri:process.env.NEXT_PUBLIC_GRAPHQL_API_URL || "https://ultimatecybervision.com.ng/graphql",
    fetchOptions: {
        mode: 'no-cors', // no-cors, *cors, same-origin
     },
     
  
})

const wsLink = new GraphQLWsLink(
  createClient({
    url:process.env.NEXT_PUBLIC_WS_API_URL ||'wss://api.bidng.ng/graphql',
  
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

// Apollo Client instance
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  /*headers: {
    "Content-Type": "application/json",  // ✅ Ensure correct content type
   
  }*/
});

export default client;
