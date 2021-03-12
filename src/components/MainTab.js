import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DeckListView from './DeckListView';
import AddDeckView from './AddDeckView';

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Decks" component={DeckListView} />
      <Tab.Screen name="Add Deck" component={AddDeckView} />
    </Tab.Navigator>
  );
}

export default MainTab;