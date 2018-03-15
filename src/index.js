import React from 'react';
import ReactDOM from 'react-dom';
import MainPanel from './components/MainPanel';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' })

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  })

ReactDOM.render(
    <ApolloProvider client={client}>
        <MainPanel />
    </ApolloProvider>

    , document.getElementById('root'));

registerServiceWorker();
