import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DeckDetailView, { DECKDETAIL_VIEW_TITLE } from './DeckDetailView';
import AddCardView, { ADDCARD_VIEW_TITLE } from './AddCardView';
import QuizView, { QUIZ_VIEW_TITLE } from './QuizView';
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
      <StatusBar />
      <NavigationContainer>
        <MainStack.Navigator>
          <MainStack.Screen
            name="Flash Cards"
            component={MainTab}
          />
          <MainStack.Screen 
            name={DECKDETAIL_VIEW_TITLE}
            component={DeckDetailView} 
          />
          <MainStack.Screen 
            name={ADDCARD_VIEW_TITLE}
            component={AddCardView} 
          />
          <MainStack.Screen 
            name={QUIZ_VIEW_TITLE}
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
  },
});

export default connect()(Main);