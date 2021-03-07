import React from 'react';
import { Text, TouchableHighlight } from "react-native";

function TextButton({ children, buttonStyle, textStyle }) {
  return (
    <TouchableHighlight 
      style={buttonStyle}
      onPress={() => alert("text button!")}
    >
      <Text style={textStyle}>{children}</Text>
    </TouchableHighlight>
  );
}



export default TextButton;