// 'use strict';

const React = require('react-native');

const { TabBarIOS, Icon} = require('react-native-icons');
const { WallTab, PeopleTab, MessagingTab } = require('../views');

const { changeTab } = require('../flux/Actions');
const { connect } = require('react-redux/native');

function mapStateToProps(state) {
  // returns an object { _reducer_: 'blah' }, in this case {currentTab: 'tab_name'}
  // if the sate was more complex..
  return state; 
}

// shortcut to avoid executing 'dispatch' from JSX
// the goTo function will be passed as props
// 'newTab' is the name of the tab you're going to navigate to
function mapDispatchToProps(dispatch) {
  return {
    goTo: (newTab) => dispatch(changeTab(newTab)),
  };
}

const TabsController = React.createClass({

  displayName: 'TabBarExample',

  propTypes: {
    currentTab: React.PropTypes.string,
    goTo: React.PropTypes.func,
  },

  render() {

    const { currentTab, goTo } = this.props;
    
    return (
      <TabBarIOS tintColor="white" barTintColor="darkslateblue" selectedTab={currentTab}>
        <TabBarIOS.Item title="Wall"
                        selected={ currentTab === 'wall' }
                        iconName={'ion|ios-list-outline'}
                        badgeValue="3"
                        iconSize={32}
                        onPress={() => goTo('wall')}>
          <WallTab />
        </TabBarIOS.Item>
        <TabBarIOS.Item title="People" 
                        selected={ currentTab === 'people' }
                        iconName={'ion|ios-people-outline'}
                        badgeValue="3"
                        iconSize={32}
                        onPress={() => goTo('people')}>
          <PeopleTab />
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Messaging" 
                        selected={ currentTab === 'messaging' }
                        iconName={'ion|ios-chatboxes-outline'}
                        badgeValue="3"
                        iconSize={32}
                        onPress={() => goTo('messaging')}>
          <MessagingTab />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(TabsController);
