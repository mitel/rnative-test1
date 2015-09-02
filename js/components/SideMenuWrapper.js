const React = require('react-native');
const { connect } = require('react-redux/native');

const SideMenu = require('react-native-side-menu');
const SideMenuContent = require('./SideMenuContent');
const { toggleSideMenu } = require('../flux/Actions');


function mapStateToProps(state) {
  return { isSideMenuClosed: state.sideMenu.closed };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSideMenu: (flag) => dispatch(toggleSideMenu(flag)),
  };
}

/*
  A higher-order component is just a function that takes an existing component 
  and returns another component that wraps it.
  usage: 
    export SideMenuWrapper
    const App_after = SideMenuWrapper(App_before)
    <App_after />

  https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775
  https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
*/

const sidebarHOC = WrappedComponent => React.createClass({

  propTypes: {
    isSideMenuClosed: React.PropTypes.bool,
    toggleSideMenu: React.PropTypes.func,
  },
  
  render() {

    // TODO: each tab will have a diferent side menu content so at some point
    // this will be part of the state
    const menuContent = <SideMenuContent />;
    
    const { isSideMenuClosed, toggleSideMenu } = this.props; // eslint-disable-line no-shadow

    console.info('is closed ' + isSideMenuClosed);

    const sidebarProps = {
      menu: menuContent, // a component that gets loaded inside the SideMenu
      closedStatus: isSideMenuClosed, // added here for future use
      onChange: toggleSideMenu, // callback that runs whenever the side menu changes state
    };
    
    return (
      <SideMenu touchToClose={true} menuPosition="left" {...sidebarProps}>
        <WrappedComponent />
      </SideMenu>
    );    
  },

});

// this HoC is going to wrap my main app component
// at the same time the HoC itself is wrapped using the connect/redux-react as it is a component
// 'interested' in the application state (as i keep the SideMenu state as part of the app state)
const sideMenuWrapper = (WrappedComponent) => connect(mapStateToProps, mapDispatchToProps)(sidebarHOC(WrappedComponent)); 

module.exports = sideMenuWrapper;
