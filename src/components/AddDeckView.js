import React, { useReducer } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import TextButton from './TextButton';
import TextInputComponent from './TextInputComponent';
import * as API from '../utils/api';
import { connect } from 'react-redux';
import { addDeck } from '../actions/decks';

const ContainerView = styled.View`
  flex: 1;
  justify-content: space-around;
`;

const TopView = styled.View`
  /* background-color: yellowgreen; */
  padding: 50px;
`;

const TitleText = styled.Text`
  font-size: 30px;
  text-align: center;
`;

const StyledTextInput = styled.TextInput`
  height: 50px;
  border: 1px solid gray;
  background-color: white;
  margin: 40px 0;
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

function AddDeckView(props) {
  const [state, dispatch] = useReducer(reducer, {
    deckName: "",
  });
  const { deckName } = state;

  const handleChangeText = (text, name) => {
    dispatch({
      name,
      text,
    });
  };

  const handleSubmit = () => {
    API.addDeck(deckName)
      .then((newDeck) => {
        console.log("[handleSubmit] newDeck:", newDeck);
        props.dispatch(addDeck(newDeck.id, newDeck.name));
        props.navigation.push("DeckDetailView", { 
          id: newDeck.id,
        });
        dispatch({
          name: "deckName",
          text: "",
        });
        
      })
      .catch(() => {
        //TODO: Error handling
      });
  };

  return (
    <ContainerView>
      <TopView>
        <TitleText>What is the name of your new deck?</TitleText>
        <TextInputComponent 
          StyledComponent={StyledTextInput}
          name="deckName"
          value={deckName}
          placeholder="Enter the name" 
          onChangeText={handleChangeText}
        />
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

export default connect()(AddDeckView);