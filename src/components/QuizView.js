import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated, Easing, View } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import reducers from '../reducers';
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
  background-color: yellow;
  font-size: 30px;
  /* text-align: center; */
  margin-top: 20px;
  margin-left: 20px;
`;

const CardContainer = styled.View`
  align-items: center;
`;

const CardView = styled.View`
  background-color: yellowgreen;
  height: 500px;
  justify-content: center;
  margin: 20px;
  /* padding: 30px; */
  
`;

const QuestionText = styled.Text`
  font-size: 40px;
  /* font-weight: bold; */
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
  font-size: 40px;
  text-align: center;
`;

const ButtonsView = styled.View`
  margin-top: 15%;
  flex-direction: row;
`;

function QuizView(props) {
  // const [showAnswer, setShowAnswer] = useState(false);
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
    navigation.push("QuizView", {
      id,
      currentIndex: currentIndex + 1,
      correctCount: (correct) ? correctCount+1 : correctCount,
    });
    // setShowAnswer(false);
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
    // Animated.spring(translation, { 
    //   toValue: 100, 
    //   // duration: 1000,
    //   delay: 250,
    //   tension: 40,
    //   friction: 4,
    //   useNativeDriver: true,
    // }).start();
    // Animated.sequence([
    //   Animated.timing(bounceValue, { duration: 1000, toValue: 1.04 }),
    //   Animated.spring(bounceValue, { toValue: 1, friction: 4 }),
    // ]).start();
  };

  let isFliped = false;
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
      toValue: showAnswer ? 360: 180,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    isFliped = !isFliped;
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
        <IndexText>Quiz {currentIndex+1} / {totalCount}</IndexText>
        <CardContainer>
          <CardView
            as={Animated.View}
            style={[styles.flipCard, {
              transform: [
                { translateY: interpolTransY },
                { rotateY: frontInterpolRotY }
              ],
            }]}
          >
            <QuestionText>{question.question}</QuestionText>
          </CardView>
          <CardView
            as={Animated.View}
            style={[styles.flipCard, styles.flipCardBack, {
              transform: [
                { rotateY: backInterpolRotY }
              ],
            }]}
          >
            <AnswerText>{question.answer}</AnswerText>
          </CardView>
        </CardContainer>
      </TopView>
      <BottomView>
        <TextButton 
          buttonStyle={[styles.buttonCommon, styles.buttonShowAnswer]}
          textStyle={[styles.textCommon, styles.textShowAnswer]}
          onPress={flipCard}
        >Show Answer</TextButton>      
        {/* <ButtonsView>
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
        </ButtonsView> */}
      </BottomView>
    </ContainerView>
  );
}

const styles = StyleSheet.create({
  flipCard: {
    width: '90%',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: 'red',
    opacity: 0.5,
    position: 'absolute',
    top: 0,
  },
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