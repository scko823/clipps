import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

import { ApolloProvider } from 'react-apollo'
import { split } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { HttpLink } from 'apollo-link-http'
import { getMainDefinition } from 'apollo-utilities'

import AppBar from './components/AppBar/AppBar'
// import App from './components/App'

import store from './stores/Store'
// import Clipboard from './components/Clipboard'

const theme = createMuiTheme({
	palette: {
		primary1Color: '#27bc9c',
	},
	appBar: {
		height: 50,
	},
})

const httpLink = new HttpLink({
	uri: process.env.QUERY_API,
})

const wsLink = new WebSocketLink({
	uri: process.env.SUBSCRIPTION_API,
	options: {
		reconnect: true,
	},
})

const link = split(
	// split based on operation type
	({ query }) => {
		const { kind, operation } = getMainDefinition(query)
		return kind === 'OperationDefinition' && operation === 'subscription'
	},
	wsLink,
	httpLink,
)

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <AppBar />
      </MuiThemeProvider>
    </Provider>
  </ApolloProvider>,
	document.getElementById('root'), // eslint-disable-line
)

if (module.hot) {
	module.hot.accept()
}
