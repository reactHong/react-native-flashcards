import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import DeckListView from './components/DeckListView';
import DeckDetailView from './components/DeckDetailView';
import AddCardView from './components/AddCardView';
import AddDeckView from './components/AddDeckView';
import QuizView from './components/QuizView';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.container}> */}
        {/* <DeckListView /> */}
        <QuizView />
        {/* <StatusBar style="auto" /> */}
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0ff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
