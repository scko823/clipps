// @flow weak
import { BrowserRouter as Router } from 'react-router-dom'
import { Route } from 'react-router'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import AppBar from './components/AppBar/AppBar'
import App from './components/App'
import Landing from './components/Landing'

import store from './stores/Store'
// import Clipboard from './components/Clipboard'

const client = new ApolloClient({
	link: new HttpLink({ uri: 'https://api.example.com/graphql' }),
	cache: new InMemoryCache(),
})

const theme = createMuiTheme({
	palette: {
		primary1Color: '#27bc9c',
	},
	appBar: {
		height: 50,
	},
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppBar />
          <Route exact path="/" component={Landing} />
          {/* <Route path="/clipboard/new" component={App} /> */}
        </MuiThemeProvider>
      </Router>
    </Provider>
  </ApolloProvider>,
	document.getElementById('root'), // eslint-disable-line
)

if (module.hot) {
	module.hot.accept()
}