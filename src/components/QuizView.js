import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated, Easing, View } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import QuizFinishView from './QuizFinishView';
import TextButton from './TextButton';
import { normalize } from '../utils/normalize';

export const QUIZ_VIEW_TITLE = "Quiz";

const ContainerView = styled.View`
  background-color: white;
  flex: 1;
`;
const TopView = styled.View`
  /* background-color: green; */
  height: 80%;
  justify-content: center;
  align-items: center;
`;
const BottomView = styled.View`
  /* background-color: yellow; */
  height: 20%;
  justify-content: center;
  align-items: center;
`;

// Top
const TitleView = styled.View`
  /* background-color: brown; */
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  margin: 10px;
`;
const CardContainer = styled.View`
  /* background-color: white; */
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
const ButtonView = styled.View`
  /* background-color: brown; */
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
const IndexText = styled.Text`
  /* background-color: yellow; */
  font-size: 30px;
  margin-left: 40px;
`;
const FlipCardView = styled.View`
  background-color: yellowgreen;
  width: 90%;
  height: 300px;  /* TODO: height should be changed on iPad */
  justify-content: center;
  backface-visibility: hidden;
  padding: 10px;
  border-radius: 30px;
`;
const QuestionText = styled.Text`
  font-size: 30px;
  text-align: center;
`;
const AnswerText = styled.Text`
  font-size: 40px;
  text-align: center;
`;

// Bottom
const ButtonsView = styled.View`
  /* margin-top: 15%; */
  flex-direction: row;
  align-items: center;
`;

function QuizView(props) {
  const [isFliped, setIsFliped] = useState(false);
  const { 
    id, 
    currentIndex, 
    totalCount, 
    correctCount,
    question, 
    navigation, 
    dispatch 
  } = props;

  if (currentIndex === totalCount) {
    return <QuizFinishView 
            correctCount={correctCount}
            totalCount={totalCount} 
            navigation={navigation}
          />
  }

  const handleAnswer = (correct) => {
    navigation.push(QUIZ_VIEW_TITLE, {
      id,
      currentIndex: currentIndex + 1,
      correctCount: (correct) ? correctCount+1 : correctCount,
    });
  };

  const translation = useRef(new Animated.Value(0)).current;
  const interpolTransY = translation.interpolate({
    inputRange: [0, 100],
    outputRange: [-300, 0],
  });
  const dropQuestion = () => {
    Animated.timing(translation, { 
      toValue: 100, 
      delay: 250,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  const rotation = useRef(new Animated.Value(0)).current;
  const frontInterpolRotY = rotation.interpolate({
    inputRange: [0, 180, 360],
    outputRange: ['0deg', '180deg', '360deg'],
  });
  const backInterpolRotY = rotation.interpolate({
    inputRange: [0, 180, 360],
    outputRange: ['180deg', '360deg', '540deg'],
  });
  const flipCard = () => {
    Animated.timing(rotation, {
      toValue: isFliped ? 360: 180,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setIsFliped(!isFliped);
  };

  useEffect(() => {
    dropQuestion();
    rotation.addListener(({ value }) => {
      if (value === 360) {
        rotation.setValue(0);
      }
    });
  }, []);

  return (
    <ContainerView>
      <TopView>
        <TitleView>
          <IndexText>Quiz {currentIndex+1} / {totalCount}</IndexText>
        </TitleView>
        <CardContainer>
          <FlipCardView
            as={Animated.View}
            style={[{
              transform: [
                { translateY: interpolTransY },
                { rotateY: frontInterpolRotY }
              ],
            }]}
          >
            <QuestionText>{question.question}</QuestionText>
          </FlipCardView>
          <FlipCardView
            as={Animated.View}
            style={[styles.flipCardBack, {
              transform: [
                { rotateY: backInterpolRotY }
              ],
            }]}
          >
            <AnswerText>{question.answer}</AnswerText>
          </FlipCardView>
        </CardContainer>
        <ButtonView>
          <TextButton 
            buttonStyle={[styles.buttonShowAnswer]}
            textStyle={[styles.textShowAnswer]}
            onPress={flipCard}
          >Show {isFliped ? "Question" : "Answer"}</TextButton>
        </ButtonView>
      </TopView>
      <BottomView>
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
      </BottomView>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  flipCardBack: {
    backgroundColor: 'red',
    opacity: 0.5,
    position: 'absolute',
    top: 0,
  },
  buttonShowAnswer: {
    backgroundColor: 'white',
    width: '40%',
    height: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  textShowAnswer: {
    fontSize: normalize(10),
    color: 'blue',
  },
  buttonCommon: {
    width: '35%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  textCommon: {
    fontSize: normalize(15),
    fontWeight: 'bold',
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