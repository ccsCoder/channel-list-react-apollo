import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { split } from 'apollo-link';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Can be any implementation of cache interface.
const cache = new InMemoryCache();

// Create a new HTTP Link
const httpLink = new HttpLink({
  uri: 'http://localhost:7800/graphql',
  credentials: 'same-origin'
});

// Create a websocket link.
const wsLink = new WebSocketLink({
    uri: `ws://localhost:7900/subscriptions`,
    options: {
        reconnect: true
    }
});

// Queries, Mutations etc are served over HTTP now,
// whereas subscriptions over web sock
const appLink = split(
    // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        if (networkError) console.log(networkError);
      }),
      appLink,
    ]),
    cache,
});



// const client = new ApolloClient({
//    cache,
//    link,
// });

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />, 
    </ApolloProvider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
