import { ApolloClient, InMemoryCache, HttpLink, split, gql } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

class GraphQLHelper {
  private client: ApolloClient<any>;

  constructor() {
    // HTTP Connection to GraphQL API
    const httpLink = new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL,
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY!,
      },
    });

    // WebSocket Connection for Real-time Updates
    const wsLink = new GraphQLWsLink(
      createClient({
        url: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL!,
        connectionParams: {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY!,
          },
        },
      })
    );

    // Split Link: Choose HTTP or WebSocket based on Query Type
    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink
    );

    // Initialize Apollo Client
    this.client = new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache(),
    });
  }

  /**
   * Perform a GraphQL Query
   * @param query - GraphQL Query Document
   * @param variables - Query Variables
   */
  async executeQuery<T>(query: any, variables: Record<string, any> = {}): Promise<T> {
    try {
      const { data } = await this.client.query({ query, variables });
      return data;
    } catch (error) {
      console.error("GraphQL Query Error:", error);
      throw error;
    }
  }

  /**
   * Perform a GraphQL Mutation
   * @param mutation - GraphQL Mutation Document
   * @param variables - Mutation Variables
   */
  async executeMutation<T>(mutation: any, variables: Record<string, any> = {}): Promise<T> {
    try {
      const { data } = await this.client.mutate({ mutation, variables });
      return data;
    } catch (error) {
      console.error("GraphQL Mutation Error:", error);
      throw error;
    }
  }

  /**
   * Subscribe to a GraphQL Subscription
   * @param subscription - GraphQL Subscription Document
   * @param variables - Subscription Variables
   * @param callback - Function to handle incoming data
   */
  subscribe<T>(subscription: any, variables: Record<string, any>, callback: (data: T) => void) {
    return this.client
      .subscribe({ query: subscription, variables })
      .subscribe({
        next: ({ data }) => callback(data),
        error: (error) => console.error("GraphQL Subscription Error:", error),
      });
  }
}

// Export an instance of the helper class
const graphqlHelper = new GraphQLHelper();
export default graphqlHelper;
