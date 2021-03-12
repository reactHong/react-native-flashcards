import React from 'react';

function TextInputComponent({ StyledComponent, onChangeText, ...props }) {

  const { name } = props;

  return (
    <StyledComponent 
      {...props} 
      onChangeText={(text) => onChangeText(text, name)} 
    />
  );
}

export default TextInputComponent;