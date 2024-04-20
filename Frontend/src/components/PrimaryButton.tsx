import React from 'react';
import {ButtonProps} from '../properties/types/ButtonTypes';
import {Text, TouchableOpacity} from 'react-native';
import primaryColors from '../properties/colors';
import {buttonStyle} from '../properties/styles/buttonStyle';

function PrimaryButton(_props: ButtonProps) {
  const {onClickMethod, title} = _props;

  return (
    <TouchableOpacity
      onPress={onClickMethod}
      style={[
        buttonStyle.buttonContainer,
        {backgroundColor: primaryColors.darkBlue},
      ]}>
      <Text style={[buttonStyle.buttonText]}>{title}</Text>
    </TouchableOpacity>
  );
}

export default PrimaryButton;
