// @flow weak
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities/lib';

import AppBar from './components/AppBar/AppBar';

import offlineSW from './sw';

const theme = createMuiTheme({
	palette: {
		primary1Color: '#27bc9c',
		accent: '#ff4081'
	},
	appBar: {
		height: 50
	}
});

const httpLink = new HttpLink({
	uri: process.env.QUERY_API
});

const wsClient = new SubscriptionClient(process.env.SUBSCRIPTION_API, {
	reconnect: true,
	connectionParams: () => {
		const token = localStorage.getItem('token');
		return {
			Authorization: `Bearer ${token || ''}`
		};
	}
});

const wsLink = new WebSocketLink(wsClient);

const link = split(
	// split based on operation type
	({ query }) => {
		const { kind, operation } = getMainDefinition(query);
		return kind === 'OperationDefinition' && operation === 'subscription';
	},
	wsLink,
	httpLink
);

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	};
});

const client = new ApolloClient({
	link: authLink.concat(link),
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
