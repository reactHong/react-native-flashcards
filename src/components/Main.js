import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DeckDetailView from './DeckDetailView';
import AddCardView from './AddCardView';
import QuizView from './QuizView';
import MainTab from './MainTab';
import * as API from '../utils/api';
import { receiveData } from '../actions/shared';

const MainStack = createStackNavigator();

function Main(props) {
  const { dispatch } = props;

  useEffect(() => {
    console.log("### [Main.useEffect]");
    API.getDecks()
      .then(decks => {
        dispatch(receiveData(decks));
      })
      .catch(() => {
        //TODO: Error handling
      });
  }, []);

  console.log("### [Main.render]");

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <MainStack.Navigator>
          <MainStack.Screen
            name="Tab"
            component={MainTab}
          />
          <MainStack.Screen 
            name="DeckDetailView" 
            component={DeckDetailView} 
          />
          <MainStack.Screen 
            name="AddCardView" 
            component={AddCardView} 
          />
          <MainStack.Screen 
            name="QuizView" 
            component={QuizView} 
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0ff',
  },
});

export default connect()(Main);