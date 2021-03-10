import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TextButton from './TextButton'
import * as API from '../utils/api';
import { confirmDelete } from '../utils/alert';
import { deleteDeck } from '../actions/decks';

const ContainerView = styled.View`
  flex: 1;
  justify-content: space-around;
`;

const TopView = styled.View`
  /* background-color: yellowgreen; */
`;

const TitleText = styled.Text`
  font-size: 40px;
  text-align: center;
`;

const DetailText = styled.Text`
  font-size: 30px;
  text-align: center;
`;

const BottomView = styled.View`
  /* background-color: yellow; */
  align-items: center;
`;

function DeckDetailView(props) {

  const { id, title, questionsCount, navigation, dispatch } = props;
  
  const handleDelete = () => {
    const title = "Delete Deck";
    const msg = "Do you really want to delete the deck?";
    confirmDelete(title, msg, () => {
      API.deleteDeck(id)
      .then(() => {
        dispatch(deleteDeck(id));
        navigation.goBack();
      });
    });
  };

  useEffect(() => {
    console.log("### [DeckDetailView.useEffect]");
    return () => {
      console.log("### [DeckDetailView.useEffect] willUnmount");    
    };
  }, []);
  console.log("### [DeckDetailView.render] props:", props);

  return (
    <ContainerView>
      <TopView>
        <TitleText>{title}</TitleText>
        <DetailText>{questionsCount} cards</DetailText>
      </TopView>
      <BottomView>
        <TextButton 
          buttonStyle={[styles.buttonCommon, styles.buttonAddCard]}
          textStyle={[styles.textCommon, styles.textAddCard]}
          onPress={() => navigation.push("AddCardView", { id })}
        >Add Card</TextButton>
        <TextButton 
          buttonStyle={[styles.buttonCommon, styles.buttonStartQuiz]}
          textStyle={[styles.textCommon, styles.textStartQuiz]}
          onPress={() => navigation.push("QuizView", { 
            id,
            currentIndex: 0,
            correctCount: 0,
          })}
        >Start Quiz</TextButton>
        <TextButton 
          buttonStyle={[styles.buttonCommon, styles.buttonDelDeck]}
          textStyle={[styles.textCommon, styles.textDelDeck]}
          onPress={handleDelete}
        >Delete Deck</TextButton>
      </BottomView>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  buttonCommon: {
    width: 280,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  textCommon: {
    fontSize: 30,
  },
  buttonAddCard: {
    backgroundColor: 'white',
  },
  textAddCard: {
    color: 'black',
  },
  buttonStartQuiz: {
    backgroundColor: 'black', 
    borderWidth: 0,
  },
  textStartQuiz: {
    color: 'white',
  },
  buttonDelDeck: {
    backgroundColor: 'white', 
    borderWidth: 0,
  }, 
  textDelDeck: {
    color: 'red',
  }
});

const mapStateToProps = (state, props) => {

  console.log("[DeckDetailView.mapStateToProps] state:", state);
  console.log("[DeckDetailView.mapStateToProps] props:", props);

  const { route, navigation, dispatch } = props;
  const { id } = route.params;
  const deck = state.decks[id];
  const { title, questions } = deck ? deck : { title: "", questions: [] };

  return {
    id, 
    title,
    questionsCount: questions.length,
    navigation: navigation,
  }
};

export default connect(mapStateToProps)(DeckDetailView);