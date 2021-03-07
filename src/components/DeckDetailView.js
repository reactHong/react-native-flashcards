import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';
import DeckListView from './DeckListView';
import TextButton from './TextButton'

const ContainerView = styled.View`
  flex: 1;
  justify-content: space-around;
`;

const TopView = styled.View`
  /* background-color: yellowgreen; */
`;

const TitleText = styled.Text`
  font-size: 40;
  text-align: center;
`;

const DetailText = styled.Text`
  font-size: 30;
  text-align: center;
`;

const BottomView = styled.View`
  /* background-color: yellow; */
  align-items: center;
`;

function DeckDetailView() {

  return (
    <ContainerView>
      <TopView>
        <TitleText>Deck1</TitleText>
        <DetailText>3 cards</DetailText>
      </TopView>
      <BottomView>
        <TextButton 
          buttonStyle={[styles.buttonCommon, styles.buttonAddCard]}
          textStyle={[styles.textCommon, styles.textAddCard]}
        >Add Card</TextButton>
        <TextButton 
          buttonStyle={[styles.buttonCommon, styles.buttonStartQuiz]}
          textStyle={[styles.textCommon, styles.textStartQuiz]}
        >Start Quiz</TextButton>
        <TextButton 
          buttonStyle={[styles.buttonCommon, styles.buttonDelDeck]}
          textStyle={[styles.textCommon, styles.textDelDeck]}
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

export default DeckDetailView;