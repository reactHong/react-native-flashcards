import React, { useEffect, useReducer } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addCard } from '../actions/decks';
import TextButton from './TextButton';
import TextInputComponent from './TextInputComponent';

const ContainerView = styled.View`
  flex: 1;
  justify-content: space-around;
  padding: 50px;
`;

const TopView = styled.View`
  /* background-color: yellowgreen; */
`;

const StyledTextInput = styled.TextInput`
  height: 50;
  border: 1px solid gray;
  background-color: white;
  margin: 20px 0;
  font-size: 30;
  border-radius: 10;
  padding-left: 10;
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
  const { id, callback } = route.params;

  const handleChangeText = (text, name) => {
    dispatch({ name, text });
  };

  const handleSubmit = () => {
    const questionCard = { question, answer };
    
    //TODO: Call API for updating AsyncStorage
    props.dispatch(addCard(id, questionCard));
    navigation.navigate("DeckDetailView");
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
          component={StyledTextInput}
          style={styles.textInput}
          value={question}
          name="question"
          placeholder="Enter the question" 
          onChangeText={handleChangeText}/>
        <TextInputComponent 
          component={StyledTextInput}
          style={styles.textInput}
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
  textInput: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'gray',
    backgroundColor: 'white',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 30,
    paddingLeft: 10,
  },
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