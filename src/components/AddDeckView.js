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
  padding: 50px;
`;

const TitleText = styled.Text`
  font-size: 30;
  text-align: center;
`;

const StyledTextInput = styled.TextInput`
  height: 50;
  border: 1px solid gray;
  background-color: white;
  margin: 40px 0;
  font-size: 30;
  border-radius: 10;
  padding-left: 10;
`;

const BottomView = styled.View`
  /* background-color: yellow; */
  align-items: center;
`;

function AddDeckView({ navigation }) {
  return (
    <ContainerView>
      <TopView>
        <TitleText>What is the tilte of your new deck?</TitleText>
        <StyledTextInput placeholder="Enter the Title" />
      </TopView>
      <BottomView>
        <TextButton 
          buttonStyle={[styles.buttonCommon, styles.buttonSubmit]}
          textStyle={[styles.textCommon, styles.textSubmit]}
          onPress={() => navigation.push("DeckDetailView")}
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

export default AddDeckView;