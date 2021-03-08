import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import DeckListView from './DeckListView';
import DeckDetailView from './DeckDetailView';
import AddCardView from './AddCardView';
import AddDeckView from './AddDeckView';
import QuizView from './QuizView';
import { getDecks } from '../_DATA';
import { receiveData } from '../actions/shared';

const Tab = createBottomTabNavigator();
const DecksStack = createStackNavigator();
const AddDeckStack = createStackNavigator();

const Stack1 = () => {
  return (
    <DecksStack.Navigator>
      <DecksStack.Screen 
        name="DeckListView" 
        component={DeckListView} 
      />
      <DecksStack.Screen 
        name="DeckDetailView" 
        component={DeckDetailView} 
      />
      <DecksStack.Screen 
        name="AddCardView" 
        component={AddCardView} 
      />
      <DecksStack.Screen 
        name="QuizView" 
        component={QuizView} 
      />
    </DecksStack.Navigator>
  );
}

const Stack2 = () => {
  return (
    <AddDeckStack.Navigator>
      <AddDeckStack.Screen 
        name="AddDeckView" 
        component={AddDeckView} 
      />
      <DecksStack.Screen 
        name="DeckDetailView" 
        component={DeckDetailView} 
      />
    </AddDeckStack.Navigator>
  );
}

function Main(props) {
  const { dispatch } = props;

  useEffect(() => {
    console.log("### [Main.useEffect]");
    getDecks()
      .then(decks => {
        console.log("### [App.useEffect] decks:", decks);
        dispatch(receiveData(decks));
      });
  }, []);

  console.log("### [Main.render]");

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Decks" component={Stack1} />
          <Tab.Screen name="Add Deck" component={Stack2} />
        </Tab.Navigator>
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