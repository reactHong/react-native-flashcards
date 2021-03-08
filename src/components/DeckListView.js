import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import DeckView from './DeckView';

const ListView = styled.View`
  width: 100%;
  height: 100%;
  background-color: yellow;
`;

function DeckListView({ navigation }) {

  console.log(navigation);

  const cards = new Array(10).fill(0);

  //TODO: enable ScrollView

  return(
    <ListView>
      {cards.map((card, index) => (
        <DeckView key={index} navigation={navigation} />
      ))}
    </ListView>
  );
}

const styles = StyleSheet.create({
  
});

export default DeckListView;