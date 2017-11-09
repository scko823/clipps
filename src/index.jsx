import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App';
import Landing from './components/Landing';
import Clipboard from './components/Clipboard';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { teal400 } from 'material-ui/styles/colors';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
	link: new HttpLink({ uri: 'https://api.example.com/graphql' }),
	cache: new InMemoryCache()
});

import store from './stores/Store';
import './styles/main.scss';

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: '#27bc9c'
	},
	appBar: {
		height: 50
	}
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<Provider store={store}>
			<MuiThemeProvider muiTheme={muiTheme}>
				<Router history={browserHistory}>
					<Route path="/" component={Landing} />
					<Route path="/clipboard/:id" component={App} />
				</Router>
			</MuiThemeProvider>
		</Provider>
	</ApolloProvider>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept();
}
