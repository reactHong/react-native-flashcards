import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import TextButton from './TextButton'

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
  margin-bottom: 100px;
`;

const DetailText = styled.Text`
  font-size: 30px;
  text-align: center;
  padding: 10px;
`;

const BottomView = styled.View`
  /* background-color: yellow; */
  align-items: center;
`;

function QuizFinishView(props) {

  const { correctCount, totalCount, navigation } = props;

  return (
    <ContainerView>
      <TopView>
        <TitleText>Quiz Finished!!</TitleText>
        <DetailText>Corrects: {correctCount}</DetailText>
        <DetailText>Incorrects: {totalCount - correctCount}</DetailText>
      </TopView>
      <BottomView>
        <TextButton 
          buttonStyle={[styles.buttonCommon, styles.buttonRetake]}
          textStyle={[styles.textCommon, styles.textRetake]}
          onPress={() => navigation.pop(totalCount)}
        >Retake</TextButton>
        <TextButton 
          buttonStyle={[styles.buttonCommon, styles.buttonMove]}
          textStyle={[styles.textCommon, styles.textMove]}
          onPress={() => navigation.pop(totalCount+1)}
        >Back to Deck</TextButton>
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
  buttonRetake: {
    backgroundColor: 'white',
  },
  textRetake: {
    color: 'black',
  },
  buttonMove: {
    backgroundColor: 'black', 
    borderWidth: 0,
  },
  textMove: {
    color: 'white',
  },
});

export default QuizFinishView;