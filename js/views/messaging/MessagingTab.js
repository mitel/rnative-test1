/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'; // eslint-disable-line strict

const React = require('react-native');
const falcor = require('falcor');
const HttpDataSource = require('falcor-http-datasource');

const {
  StyleSheet,
  Text,
  View,
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const model = new falcor.Model({source: new HttpDataSource('http://localhost:8000/model.json') });
model.
      get('greeting').
      then(function(response) {
        console.log(response.json.greeting);
      });

// console.log(HttpDataSource);
const MessagingTab = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Messaging Tab!
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  },
});

module.exports = MessagingTab;
