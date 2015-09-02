/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
// 'use strict'; // eslint-disable-line strict

const React = require('react-native');
const { createStore, applyMiddleware, combineReducers } = require('redux');
const { Provider } = require('react-redux/native');

const promiseMiddleware = require('redux-promise');
const createLoggerMiddleware = require('redux-logger');

const reducers = require('./js/flux/reducers');
const { TabsController, SideMenuWrapper} = require('./js/components');

const {
  AppRegistry,
} = React;

const { 
  currentTab, 
  sideMenu,
} = reducers;

const _loggerMiddleware = createLoggerMiddleware();
const _createReduxEnhancedStore = applyMiddleware(_loggerMiddleware, promiseMiddleware)(createStore);
const _reducer = combineReducers({...currentTab, ...sideMenu});
const store = _createReduxEnhancedStore(_reducer);

// store.subscribe(() =>
//    console.log(store.getState())
// );
// const { toggleSideMenu } = require('./js/flux/Actions');
// store.dispatch(toggleSideMenu({openStatus: true}));
// store.dispatch(toggleSideMenu({openStatus: false}));
// store.dispatch(toggleSideMenu({openStatus: true}));

const WrappedApp = SideMenuWrapper(TabsController); // eslint-disable-line new-cap

const app = React.createClass({
  render() {
    return (
      <Provider {...{ store }}>
        {() => <WrappedApp />}
      </Provider>
    );
  },
});

AppRegistry.registerComponent('test1', () => app);
