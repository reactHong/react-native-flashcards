import React from 'react';
import { Text, TouchableHighlight } from "react-native";

function TextButton({ children, buttonStyle, textStyle, onPress }) {
  return (
    <TouchableHighlight 
      style={buttonStyle}
      onPress={onPress}>
      <Text style={textStyle}>{children}</Text>
    </TouchableHighlight>
  );
}

export default TextButton;