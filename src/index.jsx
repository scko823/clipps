import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App';
import Clipboard from './components/Clipboard';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { pink500 } from 'material-ui/styles/colors';

import store from './stores/Store';
import './styles/main.scss';

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: '#16A086'
	},
	appBar: {
		height: 50
	}
});

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider muiTheme={muiTheme}>
			<Router history={browserHistory}>
				<Route path="/" component={App} />
			</Router>
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept();
}
