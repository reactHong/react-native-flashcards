import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DeckView from './DeckView';

const ListView = styled.View`
  width: 100%;
  height: 100%;
  background-color: yellow;
`;

function DeckListView({ decks, navigation }) {
  
  //TODO: enable ScrollView

  const decksArray = Object.values(decks);

  return(
    <ListView>
      {decksArray.map((deck, index) => (
        <DeckView 
          key={index} 
          navigation={navigation} 
          deck={deck}
        />
      ))}
    </ListView>
  );
}

const styles = StyleSheet.create({
  
});

const mapStateToProps = ({ decks }, { navigation }) => ({
  decks,
  navigation: navigation,
});

export default connect(mapStateToProps)(DeckListView);