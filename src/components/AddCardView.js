import React, { useEffect, useReducer } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addCard } from '../actions/decks';
import TextButton from './TextButton';
import TextInputComponent from './TextInputComponent';
import * as API from '../utils/api';

const ContainerView = styled.View`
  flex: 1;
  justify-content: space-around;
  padding: 50px;
`;

const TopView = styled.View`
  /* background-color: yellowgreen; */
`;

const StyledTextInput = styled.TextInput`
  height: 50px;
  border: 1px solid gray;
  background-color: white;
  margin: 20px 0;
  font-size: 30px;
  border-radius: 10px;
  padding-left: 10px;
`;

const BottomView = styled.View`
  /* background-color: yellow; */
  align-items: center;
`;

const reducer = (state = {}, action) => {
  return {
    ...state,
    [action.name]: action.text,
  };
};

function AddCardView(props) {

  const [state, dispatch] = useReducer(reducer, {
    question: '',
    answer: '',
  });
  const { question, answer } = state;
  const { route, navigation } = props;
  const { id } = route.params;

  const handleChangeText = (text, name) => {
    dispatch({ name, text });
  };

  const handleSubmit = () => {
    const newQuestion = { question, answer };

    API.addCard(id, newQuestion) 
      .then(() => {
        props.dispatch(addCard(id, newQuestion));
        navigation.navigate("DeckDetailView");
      });
  };

  useEffect(() => {
    console.log("### [AddCardView.useEffect]");
    return () => {
      console.log("### [AddCardView.useEffect] willUnmount");
    };
  }, []);
  console.log("### [AddCardView.render]");

  return (
    <ContainerView>
      <TopView>
        <TextInputComponent 
          StyledComponent={StyledTextInput}
          value={question}
          name="question"
          placeholder="Enter the question" 
          onChangeText={handleChangeText}/>
        <TextInputComponent 
          StyledComponent={StyledTextInput}
          value={answer}
          name="answer"
          placeholder="Enter the answer" 
          onChangeText={handleChangeText}/>
      </TopView>
      <BottomView>
        <TextButton 
          buttonStyle={[styles.buttonCommon, styles.buttonSubmit]}
          textStyle={[styles.textCommon, styles.textSubmit]}
          onPress={handleSubmit}
        >Submit</TextButton>
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
  buttonSubmit: {
    backgroundColor: 'purple',
  },
  textSubmit: {
    color: 'white',
  },
});


export default connect()(AddCardView);