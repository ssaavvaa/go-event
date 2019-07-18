import React from "react";

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from "apollo-link-error";
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'

import fetch from 'isomorphic-fetch';


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
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
});



const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },

  authLink.concat(httpLink)
)



const client = new ApolloClient({
  error,
  link,
  cache: new InMemoryCache(),
  fetch
});

export const wrapRootElement = ({ element}) => (

   <ApolloProvider  client={client}>
    {element}
   </ApolloProvider>
)