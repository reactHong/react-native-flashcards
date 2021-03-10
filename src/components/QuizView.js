import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import QuizFinishView from './QuizFinishView';
import TextButton from './TextButton'

const ContainerView = styled.View`
  flex: 1;
  justify-content: space-around;
`;

// Top
const TopView = styled.View`
  background-color: green;
`;

const IndexText = styled.Text`
  font-size: 30px;
  /* text-align: center; */
  margin-top: 20px;
  margin-left: 20px;
`;

const CardView = styled.View`
  background-color: yellowgreen;
  margin: 20px;
  padding: 30px;
`;

const QuestionText = styled.Text`
  font-size: 40px;
  font-weight: bold;
  text-align: center;
`;

// Bottom
const BottomView = styled.View`
  background-color: yellow;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: 40px;
  font-weight: bold;
  text-align: center;
`;

const AnswerView = styled.View`
  background-color: orange;
  width: 90%;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
`;

const AnswerText = styled.Text`
  font-size: 30px;
  text-align: center;
`;

const ButtonsView = styled.View`
  margin-top: 15%;
  flex-direction: row;
`;

function QuizView(props) {

  const [showAnswer, setShowAnswer] = useState(false);
  const { 
    id, 
    currentIndex, 
    totalCount, 
    correctCount,
    question, 
    navigation, 
    dispatch 
  } = props;

  const handleAnswer = (correct) => {
    navigation.push("QuizView", {
      id,
      currentIndex: currentIndex + 1,
      correctCount: (correct) ? correctCount+1 : correctCount,
    });
    setShowAnswer(false);
  };

  if (currentIndex === totalCount) {
    return <QuizFinishView 
            correctCount={correctCount}
            totalCount={totalCount} 
            navigation={navigation}
          />
  }

  return (
    <ContainerView>
      <TopView>
        <IndexText>Quiz {currentIndex+1} / {totalCount}</IndexText>
        <CardView>
          <QuestionText>{question.question}</QuestionText>
        </CardView>
      </TopView>
      <BottomView>
        {!showAnswer
          ? <TextButton 
              buttonStyle={[styles.buttonCommon, styles.buttonShowAnswer]}
              textStyle={[styles.textCommon, styles.textShowAnswer]}
              onPress={() => setShowAnswer(true)}
            >Show Answer</TextButton>
          : <>
              <TitleText>Answer</TitleText>
              <AnswerView>
                <AnswerText>{question.answer}</AnswerText>
              </AnswerView>  
              <ButtonsView>
                <TextButton 
                  buttonStyle={[styles.buttonCommon, styles.buttonCorrect]}
                  textStyle={[styles.textCommon, styles.textCorrect]}
                  onPress={() => handleAnswer(true)}
                >Correct</TextButton>
                <TextButton 
                  buttonStyle={[styles.buttonCommon, styles.buttonIncorrect]}
                  textStyle={[styles.textCommon, styles.textIncorrect]}
                  onPress={() => handleAnswer(false)}
                >Incorrect</TextButton>
              </ButtonsView>
            </>
        }
      </BottomView>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  buttonCommon: {
    width: '35%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  textCommon: {
    fontSize: 30,
  },
  buttonShowAnswer: {
    backgroundColor: 'white',
    width: '50%',
    height: '30%',
    borderRadius: 20,
    borderWidth: 1,
  },
  textShowAnswer: {
    fontSize: 25,
  },
  buttonCorrect: {
    backgroundColor: 'green', 
    borderWidth: 0,
  },
  textCorrect: {
    color: 'white',
  },
  buttonIncorrect: {
    backgroundColor: 'red',
  },
  textIncorrect: {
    color: 'white',
  },
});

const mapStateToProps = (state, props) => {

  const { route, navigation, dispatch } = props;
  const { id, currentIndex, correctCount } = route.params;
  const deck = state.decks[id];
  const totalCount = deck.questions.length;
  const question = deck.questions[currentIndex];

  return {
    id,
    currentIndex,
    totalCount,
    correctCount,
    question,
    navigation,
    dispatch,
  };
};

export default connect(mapStateToProps)(QuizView);