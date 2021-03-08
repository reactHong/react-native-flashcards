import React from 'react';
import styled from 'styled-components/native';

const ContainerView = styled.TouchableOpacity`
  background-color: yellowgreen;
  padding: 20px;
  margin: 10px;
  border-radius: 20px;
`;

const TitleText = styled.Text`
  font-size: 25;
  text-align: center;
`;

const DetailText = styled.Text`
  font-size: 25;
  text-align: center;
`;

function DeckView({ deck, navigation }) {

  const { title, questions } = deck;

  return(
    <ContainerView onPress={() => navigation.push('DeckDetailView')}>
      <TitleText>{title}</TitleText>
      <DetailText>{questions.length} cards</DetailText>
    </ContainerView>
  );
}


export default DeckView;