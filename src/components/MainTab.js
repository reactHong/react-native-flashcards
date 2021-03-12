import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeckListView from './DeckListView';
import AddDeckView from './AddDeckView';

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Decks') {
            iconName = focused ? 'ios-list' : 'ios-list';
          } else if (route.name === 'Add Deck') {
            iconName = focused ? 'add-outline' : 'add-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}>
      <Tab.Screen name="Decks" component={DeckListView} />
      <Tab.Screen name="Add Deck" component={AddDeckView} />
    </Tab.Navigator>
  );
}

export default MainTab;