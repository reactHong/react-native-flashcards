import React, { useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TextButton from './TextButton'
import * as API from '../utils/api';
import { confirmDelete } from '../utils/alert';
import { deleteDeck } from '../actions/decks';
import { QUIZ_VIEW_TITLE } from './QuizView';
import { ADDCARD_VIEW_TITLE } from './AddCardView';

export const DECKDETAIL_VIEW_TITLE = "Deck Detail";

const ContainerView = styled.View`
  flex: 1;
  justify-content: space-around;
`;

const TopView = styled.View`

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
  align-items: center;
`;

function DeckDetailView(props) {

  const { id, title, questionsCount, navigation, dispatch } = props;
  
  const handleStartQuiz = () => {
    if (!questionsCount) {
      Alert.alert("Start Quiz", "There is no cards.\nPlease add a card.");
      return;
    }
    navigation.push(QUIZ_VIEW_TITLE, { 
      id,
      currentIndex: 0,
      correctCount: 0,
    });
  };

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
          onPress={() => navigation.push(ADDCARD_VIEW_TITLE, { id })}
        >Add Card</TextButton>
        <TextButton 
          buttonStyle={[styles.buttonCommon, styles.buttonStartQuiz]}
          textStyle={[styles.textCommon, styles.textStartQuiz]}
          onPress={handleStartQuiz}
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