import React from 'react';
import { Text, TouchableHighlight, TouchableOpacity } from "react-native";
import {  } from 'react-native-gesture-handler';

function TextButton({ children, buttonStyle, textStyle, onPress }) {
  return (
    <TouchableOpacity 
      style={buttonStyle}
      onPress={onPress}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
}

export default TextButton;