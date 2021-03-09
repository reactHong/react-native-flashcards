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

function DeckView(props) {

  const { id, title, questionsCount, navigation } = props;
  
  return(
    <ContainerView 
      onPress={() => navigation.push('DeckDetailView', { id })}
    >
      <TitleText>{title}</TitleText>
      <DetailText>{questionsCount} cards</DetailText>
    </ContainerView>
  );
}


export default DeckView;