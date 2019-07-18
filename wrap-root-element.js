import React from "react";

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from "apollo-link-error";
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { WebSocketLink } from 'apollo-link-ws';
import fetch from 'isomorphic-fetch';

// http://localhost:5000/graphql
//https://mysterious-stream-23271.herokuapp.com/graphql

// ws://localhost:5000/graphql
// wss://mysterious-stream-23271.herokuapp.com/graphql

const GRAPHQL_ENDPOINT = 'wss://mysterious-stream-23271.herokuapp.com/graphql';
const uri = 'https://mysterious-stream-23271.herokuapp.com/graphql';

const wsLink = new WebSocketLink({
    uri: GRAPHQL_ENDPOINT,
    options: {
      reconnect: true
    }
  });





const error = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});



const httpLink = createHttpLink({
  uri
});




const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token,
    }
  }
});



const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink)
)



const client = new ApolloClient({
  fetch,
  error,
  link,
  cache: new InMemoryCache()
});

export const wrapRootElement = ({ element}) => (

   <ApolloProvider  client={client}>
    {element}
   </ApolloProvider>
)