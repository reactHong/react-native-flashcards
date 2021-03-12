import React, { useEffect, useReducer, useState } from 'react';
import { Alert, StyleSheet, Platform, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addCard } from '../actions/decks';
import TextButton from './TextButton';
import TextInputComponent from './TextInputComponent';
import * as API from '../utils/api';
import { DECKDETAIL_VIEW_TITLE } from './DeckDetailView';

const ContainerView = styled.View`
  flex: 1;
  justify-content: space-around;
  padding: 50px;
`;

const TopView = styled.View`
  /* background-color: yellowgreen; */
  align-items: center;
`;

const StyledTextInput = styled.TextInput`
  width: 100%;
  height: 50px;
  border: 1px solid gray;
  background-color: white;
  margin: 20px 0;
  font-size: 30px;
  border-radius: 10px;
  padding-left: 10px;
`;

const StyledImage = styled.Image`
  width: 200px;
  height: 200px;
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
  // const [image, setImage] = useState(null);
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

  //TODO: Add loading image feature
  // const handleLoadImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   }
  // };

  const handleSubmit = () => {
    if (!question || !answer) {
      const msg = (!question) ? "question" : "answer";
      Alert.alert("Add Card", `Please enter the ${msg}!`);
      return;
    }

    const newQuestion = { question, answer };
    API.addCard(id, newQuestion) 
      .then(() => {
        props.dispatch(addCard(id, newQuestion));
        navigation.navigate(DECKDETAIL_VIEW_TITLE);
      });
  };

  useEffect(() => {
    // (async () => {
    //   if (Platform.OS !== 'web') {
    //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     if (status !== 'granted') {
    //       alert('Sorry, we need camera roll permissions to make this work!');
    //     }
    //   }
    // })();    
  }, []);

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
        {/* TODO:  */}
        {/* {image && <StyledImage source={{ uri: image }} />}
        <TextButton 
          buttonStyle={[styles.buttonCommon, styles.buttonLoad]}
          textStyle={[styles.textCommon, styles.textLoad]}
          onPress={handleLoadImage}
        >Load Image for Hint</TextButton> */}
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
  buttonLoad: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    width: 200,
    height: 50,
  },
  textLoad: {
    color: 'blue',
    fontSize: 15,
  },
  buttonSubmit: {
    backgroundColor: 'purple',
  },
  textSubmit: {
    color: 'white',
  },
});

export const ADDCARD_VIEW_TITLE = "Add Card";
export default connect()(AddCardView);