import React from 'react';
import {ButtonProps} from '../properties/types/ButtonTypes';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import primaryColors from '../properties/colors';
import {FontWeight, fontSize, paddingSize} from '../properties/vars';

function PrimaryButton(
  _props: ButtonProps & {color: string; fontWeight?: FontWeight},
) {
  const {handleOnClick, title, color, fontWeight, helperText, helperTextColor} =
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
      fontSize: fontSize.baseMobileFontSize,
    },
    helperText: {
      color: helperTextColor || primaryColors.darkGrey,
      fontSize: fontSize.baseMobileFontSize,
    },
  });

  return (
    <View style={buttonStyle.buttonContainer}>
      <Text style={buttonStyle.helperText}>{helperText}</Text>
      <Pressable onPress={handleOnClick}>
        <Text style={buttonStyle.buttonText}>{title}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;
