/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// material-ui components
import MUIAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from 'material-ui/Drawer';

// recompose
import { compose, withStateHandlers, lifecycle } from 'recompose';

// GraphQL
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import allClipboardsQuery from '../../../graphql/queries/allClipboards';
import clipboardsSubscription from '../../../graphql/subscriptions/clipboards';
import createNowClipboardMutation from '../../../graphql/mutations/createNowClipboard';

// components
import DrawerList from './DrawerList';
import ASAPButton from './ASAPButton';
import LoginButton from './LoginButton';
import UserAvatar from './UserAvatar';
import HighlightTheme from './HighlightTheme';
import AddClipboard from '../AddClipboard';
import ClipboardView from '../Clipboards/ClipboardView';
import ClipView from '../Clips/ClipView';
import SignUp from '../Auth/SignUp';
import Login from '../Auth/Login';
import ForgetPassword from '../Auth/ForgetPassword';
import ResetPassword from '../Auth/ResetPassword';
import ValidateEmail from '../Auth/ValidateEmail';

// PrivateRoute
import PrivateRoute from '../Auth/PrivateRoute';

// contexts
import AuthContext from '../contexts/AuthContext';
import HighlightThemeContext from '../contexts/HighlightThemeContext';

/**
 *
 * @param {boolean} loadingClipboards loading clipboard state, ie fetching with apollo
 * @param {Object[]} clipboards clipboard data
 * @param {string} clipboards[].name clipboard name
 * @param {function} refetchClipboard refetchClipboard callback
 * @param {Object} classes classes to be used by JSS/materialUI
 * @param {boolean} showDrawer show drawer state
 * @param {function} toggleDrawer toggle show drawer state
 */
const ClipboardAppBar = ({
	loadingClipboards,
	clipboards,
	refetchClipboard,
	showDrawer,
	toggleDrawer,
	nowBoardId,
	isLogin,
    theme,
    onChangeTheme,
	onLogin,
	onLogout
}) => (
  <AuthContext.Provider value={isLogin}>
    <HighlightThemeContext.Provider value={{onChangeTheme, theme}}>
      <Router>
        <div id="clipboard">
          <MUIAppBar position="static">
            <Toolbar>
              <IconButton onClick={toggleDrawer} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" style={{ flexGrow: 1 }}>
								ClipBoards
              </Typography>
              <AuthContext.Consumer>
                {value =>
									value ? (
										React.createElement(UserAvatar, {
											onLogout
										})
									) : (
  <LoginButton />
									)
								}
              </AuthContext.Consumer>
              <ASAPButton disabled={!isLogin} nowBoardId={nowBoardId} />
            </Toolbar>
          </MUIAppBar>
          <Drawer open={showDrawer} onClose={toggleDrawer} className="drawer">
            <DrawerList
              nowBoardId={nowBoardId}
              loading={loadingClipboards}
              clipboards={clipboards}
              refetch={refetchClipboard}
              toggleDrawer={toggleDrawer}
            />
          </Drawer>
          <Switch>
            <Redirect exact from="/" to="/boards/NOW" />
            <Route path="/signup" component={SignUp} />
            <Route
              path="/login"
              render={props => <Login {...props} onLoginSuccess={onLogin} />}
            />
            <Route path="/validate-email" component={ValidateEmail} />
            <Route path="/forget-password" component={ForgetPassword} />
            <Route path="/reset-password/:token?" component={ResetPassword} />
            <PrivateRoute exact path="/add" component={AddClipboard} />
            <PrivateRoute
              exact
              path="/boards/:clipboardName"
              component={ClipboardView}
            />
            <PrivateRoute exact path="/:clipboardName/:clipName" component={ClipView} />
          </Switch>
        </div>
      </Router>
      <HighlightTheme />
    </HighlightThemeContext.Provider>
  </AuthContext.Provider>
);

ClipboardAppBar.propTypes = {
	loadingClipboards: PropTypes.bool.isRequired,
	refetchClipboard: PropTypes.func.isRequired,
	nowBoardId: PropTypes.string.isRequired,
	clipboards: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		})
	).isRequired,
	showDrawer: PropTypes.bool,
	toggleDrawer: PropTypes.func.isRequired,
	isLogin: PropTypes.bool.isRequired,
	onLogout: PropTypes.func.isRequired,
	onLogin: PropTypes.func.isRequired,
	onChangeTheme: PropTypes.func.isRequired,
	theme: PropTypes.string.isRequired
};

ClipboardAppBar.defaultProps = {
	showDrawer: false
};

// GraphQL Clipboard query
const withAllClipboardsQuery = graphql(
	gql`
		${allClipboardsQuery}
	`,
	{
		options: {
			notifyOnNetworkStatusChange: true
		},
		props: ({ ownProps, data: { loading, allClipboards, refetch, subscribeToMore } }) => ({
			...ownProps,
			loadingClipboards: loading,
			clipboards: allClipboards,
			refetchClipboard: refetch,
			subscribeToMore
		})
	}
);

// GraphQL createNowBoard mutation
const withCreateNowClipboardMutation = graphql(
	gql`
		${createNowClipboardMutation}
	`,
	{
		props: ({ ownProps, mutate }) => ({
			...ownProps,
			createNowBoard: mutate
		})
	}
);

const recomposeEnhancer = compose(
	// make component "stateful" to toggle the drawer
	withStateHandlers(
		({ initShowDrawer = false, nowBoardId = '1', isLogin = false }) => {
			const theme = localStorage.getItem('theme') || 'solarized-dark';
			return {
				showDrawer: initShowDrawer,
				nowBoardId,
				isLogin,
				theme
			};
		},
		{
			toggleDrawer: ({ showDrawer }) => () => ({
				showDrawer: !showDrawer
			}),
			setNowBoardId: () => id => ({ nowBoardId: id }),
			onLogout: () => () => ({ isLogin: false }),
            onLogin: () => () => ({ isLogin: true }),
            onChangeTheme: () => (event) => {
                const newTheme = event.target.id.replace('theme-', '');
                localStorage.setItem('theme', newTheme);
                return {
                    theme: newTheme
                }
            }
		}
	),
	lifecycle({
		componentWillMount() {
			const {
				createNowBoard,
				setNowBoardId,
				refetchClipboard,
				onLogin,
				onLogout
			} = this.props;
			try {
				const token = localStorage.getItem('token');
				if (token) {
					onLogin();
				}
			} catch (ex) {
				onLogout();
			}
			// add subscription for CREATED, UPDATED , DELETED for clipboards
			this.props.subscribeToMore({
				document: gql`
					${clipboardsSubscription}
				`,
				updateQuery: (
					{ allClipboards },
					{
						subscriptionData: {
							data: {
								Clipboard: { mutation, node /* updatedFields, previousValues */ }
							}
						}
					}
				) => {
					if (mutation === 'CREATED') {
						return { allClipboards: [...allClipboards, node] };
					}
					return { allClipboards };
				}
			});
			refetchClipboard().then(({ data: { allClipboards } }) => {
				if (allClipboards.every(b => b.name !== 'NOW')) {
					return createNowBoard().then(({ data: { createClipboard: { id } } }) => {
						setNowBoardId(id);
						refetchClipboard();
					});
				}
				const nowBoard = allClipboards.find(b => b.name === 'NOW');
				return setNowBoardId(nowBoard.id);
			});
		}
	})
);

const enhancer = compose(withAllClipboardsQuery, withCreateNowClipboardMutation, recomposeEnhancer);

export default enhancer(ClipboardAppBar);
