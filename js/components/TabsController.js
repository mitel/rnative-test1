// 'use strict';

const React = require('react-native');

const { TabBarIOS, Icon} = require('react-native-icons');
const { WallTab, PeopleTab, MessagingTab } = require('../views');

const { changeTab } = require('../flux/Actions');
const { connect } = require('react-redux/native');

function mapStateToProps(state) {
  // returneaza un obiect { nume_reducer: 'blah' }, in cazul de fatza {currentTab: 'nume_tab'}
  // daca state-ul ar fi mai complex si vreau sa returnez o portiune de state..
  return state; 
}

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
