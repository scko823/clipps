/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// material-ui components
import MUIAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
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
import AddClipboard from '../AddClipboard';
import ClipboardView from '../Clipboards/ClipboardView';
import ClipView from '../Clips/ClipView';
import SignUp from '../Auth/SignUp';
import ValidateEmail from '../Auth/ValidateEmail';

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
    nowBoardId
}) => (
  <Router>
    <div id="clipboard">
      <MUIAppBar position="static">
        <Toolbar>
          <IconButton onClick={toggleDrawer} color="contrast" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" style={{ flexGrow: 1 }}>
                        ClipBoards
          </Typography>
          <LoginButton />
          <ASAPButton nowBoardId={nowBoardId} />
        </Toolbar>
      </MUIAppBar>
      <Drawer open={showDrawer} onRequestClose={toggleDrawer} className="drawer">
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
        <Route path="/validate-email/:email" component={ValidateEmail} />
        <Route exact path="/add" component={AddClipboard} />
        <Route
          exact
          path="/boards/:clipboardName"
          component={ClipboardView}
        />
        <Route exact path="/:clipboardName/:clipName" component={ClipView} />
      </Switch>
    </div>
  </Router>
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
    toggleDrawer: PropTypes.func.isRequired
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
const withCreateNowClipboardMutation = graphql(gql`${createNowClipboardMutation}`, {
    props: ({ ownProps, mutate }) => ({
        ...ownProps,
        createNowBoard: mutate
    })
});

const recomposeEnhancer = compose(
    // make component "stateful" to toggle the drawer
    withStateHandlers(
        ({ initShowDrawer = false, nowBoardId = '1' }) => ({
            showDrawer: initShowDrawer,
            nowBoardId
        }),
        {
            toggleDrawer: ({ showDrawer }) => () => ({
                showDrawer: !showDrawer
            }),
            setNowBoardId: () => id => ({ nowBoardId: id })
        }
    ),
    // add subscription for CREATED, UPDATED , DELETED for clipboards
    lifecycle({
        componentWillMount() {
            this.props.subscribeToMore({
                document: gql`${clipboardsSubscription}`,
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
        },
        componentDidUpdate({ clipboards: pClipboards }) {
            const {
                clipboards: cClipboards,
                createNowBoard,
                refetchClipboard,
                setNowBoardId
            } = this.props;
            const prevClipsEmpty = !pClipboards || (pClipboards && pClipboards.length === 0);
            if (!prevClipsEmpty) {
                return;
            }
            const currentClipsEmpty =
                cClipboards && Array.isArray(cClipboards) && cClipboards.length === 0;
            if (currentClipsEmpty) {
                return;
            }
            const NowBoardExist = cClipboards.some(b => b.name === 'NOW');
            if (!NowBoardExist) {
                createNowBoard().then(({ data: { createClipboard: { id } } }) => {
                    setNowBoardId(id);
                    refetchClipboard();
                });
            } else {
                const nowBoard = cClipboards.find(b => b.name === 'NOW');
                setNowBoardId(nowBoard.id);
            }
        }
    })
);

const enhancer = compose(withAllClipboardsQuery, withCreateNowClipboardMutation, recomposeEnhancer);

export default enhancer(ClipboardAppBar);
