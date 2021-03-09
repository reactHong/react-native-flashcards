import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DeckView from './DeckView';

const ListView = styled.View`
  width: 100%;
  height: 100%;
  background-color: yellow;
`;

function DeckListView({ decks, navigation }) {
  
  const data = Object.entries(decks);

  const renderItem = ({ item }) => {
    const [id, value] = item;
    const { title, questions } = value;

    return (<DeckView 
      navigation={navigation} 
      id={id}
      title={title}
      questionsCount={questions.length}
    />);
  };

  console.log("### [DeckListView.render]");

  return(
    <ListView>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item[0]}
      />
    </ListView>
  );
}

const styles = StyleSheet.create({
  
});

const mapStateToProps = ({ decks }, { navigation }) => {
  console.log("[DeckListView.mapStateToProps] decks:", decks);
  return {
    decks,
    navigation,
  }
};

export default connect(mapStateToProps)(DeckListView);