import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {RootNavigation} from './src/routes/index'
export default class App extends Component {
   
  render() {
    const Routes = RootNavigation()
    return (
      <View style={styles.container}>
      <Routes/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
