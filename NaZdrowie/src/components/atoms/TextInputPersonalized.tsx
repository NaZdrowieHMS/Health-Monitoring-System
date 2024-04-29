import primaryColors from "properties/colors";
import { InputProps } from "properties/types/InputType";
import { borderRadiusSize, fontSize, paddingSize } from "properties/vars";
import React from "react";
import { StyleSheet, TextInput } from "react-native";

function TextInputPersonalized(props: InputProps) {
  const { placeholder } = props;
  const [text, onChangeText] = React.useState("");

  const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      padding: paddingSize.small,
      borderRadius: borderRadiusSize.medium,
      fontSize: fontSize.baseMobileFontSize,
      color: primaryColors.darkGrey,
      borderColor: primaryColors.lightGrey,
    },
  });

  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
        placeholderTextColor={primaryColors.lightGrey}
      />
    </>
  );
}

export default TextInputPersonalized;
