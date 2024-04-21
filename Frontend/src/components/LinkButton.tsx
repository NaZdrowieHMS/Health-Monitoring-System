import React from 'react';
import {ButtonProps} from '../properties/types/ButtonTypes';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import primaryColors from '../properties/colors';
import {FontWeight, fontSize, paddingSize} from '../properties/vars';

function PrimaryButton(
  _props: ButtonProps & {color: string; fontWeight?: FontWeight},
) {
  const {onClickMethod, title, color, fontWeight, helperText, helperTextColor} =
    _props;

  const buttonStyle = StyleSheet.create({
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      columnGap: paddingSize.xxSmall,
    },
    buttonText: {
      color: color,
      fontWeight: fontWeight,
      fontSize: fontSize.buttonMobileFontSize,
    },
    helperText: {
      color: helperTextColor || primaryColors.darkGrey,
      fontSize: fontSize.buttonMobileFontSize,
    },
  });

  return (
    <View style={buttonStyle.buttonContainer}>
      <Text style={buttonStyle.helperText}>{helperText}</Text>
      <TouchableOpacity onPress={onClickMethod}>
        <Text style={buttonStyle.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PrimaryButton;
