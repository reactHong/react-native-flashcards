import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DeckView from './DeckView';

const ContainerView = styled.View`
  /* background-color: yellow; */
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const MainText = styled.Text`
  font-size: 50px;
  margin-bottom: 20px;
`;
const SubText = styled.Text`
  font-size: 20px;
  color: gray;
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

  return ((data.length === 0)
    ? <ContainerView>
        <MainText>No Decks</MainText>
        <SubText>Please add a new Deck on the bottom menu.</SubText>
      </ContainerView>
    : <ContainerView>
        <FlatList
          style={[styles.list]}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item[0]}
        />
      </ContainerView>
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
  }
});

const mapStateToProps = ({ decks }, { navigation }) => {
  console.log("[DeckListView.mapStateToProps] decks:", decks);
  return {
    decks,
    navigation,
  }
};

export default connect(mapStateToProps)(DeckListView);