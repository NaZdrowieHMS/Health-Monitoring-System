import primaryColors from "properties/colors";
import { InputProps } from "properties/types";
import { borderRadiusSize, fontSize, paddingSize } from "properties/vars";
import React, { useEffect } from "react";
import { StyleSheet, TextInput } from "react-native";

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

const TextInputPersonalized: React.FC<InputProps> = (props: InputProps) => {
  const { placeholder, onChange } = props;
  const [text, onChangeText] = React.useState("");

  useEffect(() => {
    if (onChange !== undefined) {
      onChange(text);
    }
  }, [text]);

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
};

export default TextInputPersonalized;
