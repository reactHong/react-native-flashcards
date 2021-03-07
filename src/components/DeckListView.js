import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components';
import DeckView from './DeckView';

const ListView = styled.View`
  width: 100%;
  height: 100%;
  background-color: yellow;
`;

function DeckListView() {

  const cards = new Array(10).fill(0);

  //TODO: enable ScrollView

  return(
    <ListView>
      {cards.map((card, index) => <DeckView key={index} />)}
    </ListView>
  );
}

const styles = StyleSheet.create({
  
});

export default DeckListView;