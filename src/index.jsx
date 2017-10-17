import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App';

import store from './stores/Store';
import './styles/main.scss';

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider>
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					{/* <IndexRoute component={Home} />
					<Route path="about" component={About} /> */}
				</Route>
			</Router>
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept();
}
