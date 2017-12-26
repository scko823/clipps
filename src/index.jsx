// @flow weak
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities/lib';

// import fetch from 'unfetch';

import AppBar from './components/AppBar/AppBar';

import offlineSW from './sw';

const theme = createMuiTheme({
    palette: {
        primary1Color: '#27bc9c'
    },
    appBar: {
        height: 50
    }
});

const httpLink = new HttpLink({
    uri: process.env.QUERY_API
});

const wsLink = new WebSocketLink({
    uri: process.env.SUBSCRIPTION_API,
    options: {
        reconnect: true
    }
});

const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

const render = () => {
    ReactDOM.render(
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <AppBar />
        </MuiThemeProvider>
      </ApolloProvider>,
        // $FlowFixMe
        document.getElementById('root'),
        offlineSW
    );
};

render();

if (module.hot) {
    module.hot.accept('./components/AppBar/AppBar', render);
}
