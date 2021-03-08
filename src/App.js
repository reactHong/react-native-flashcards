import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import DeckListView from './components/DeckListView';
import DeckDetailView from './components/DeckDetailView';
import AddCardView from './components/AddCardView';
import AddDeckView from './components/AddDeckView';
import QuizView from './components/QuizView';

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

export default function App() {
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
