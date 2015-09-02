const React = require('react-native');
const { connect } = require('react-redux/native');

const SideMenu = require('react-native-side-menu');
const SideMenuContent = require('./SideMenuContent');
const { toggleSideMenu } = require('../flux/Actions');
const { WallSideMenu, PeopleSideMenu, MessagingSideMenu } = require('../views');


function mapStateToProps(state) {
  return { 
    // future use
    isSideMenuClosed: state.sideMenu.closed, 
    
    // using this to decide which side menu content to load, 
    // based on the selected tab
    selectedTab: state.currentTab, 
  };
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
    export sideMenuWrapper from this file
    const App_after = sideMenuWrapper(App_before) where you want to use it
    <App_after /> in JSX

  https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775
  https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
*/

const sidebarHOC = WrappedComponent => React.createClass({

  propTypes: {
    isSideMenuClosed: React.PropTypes.bool,
    selectedTab: React.PropTypes.string,
    toggleSideMenu: React.PropTypes.func,
  },
  
  render() {

    const { isSideMenuClosed, toggleSideMenu, selectedTab } = this.props; // eslint-disable-line no-shadow
    
    let menuContent;
    if (selectedTab === 'wall') menuContent = <WallSideMenu />;
    if (selectedTab === 'people') menuContent = <PeopleSideMenu />;
    if (selectedTab === 'messaging') menuContent = <MessagingSideMenu />;
    
    // console.info('side menu is closed: ' + isSideMenuClosed);

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
