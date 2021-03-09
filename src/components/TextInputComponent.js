import React from 'react';
import { TextInput } from 'react-native';

function TextInputComponent({ onChangeText, ...props }) {

  const { name } = props;

  return (
    <TextInput 
      {...props} 
      onChangeText={(text) => onChangeText(text, name)} 
    />
  );
}

export default TextInputComponent;