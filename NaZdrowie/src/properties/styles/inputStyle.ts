import primaryColors from "properties/colors";
import { paddingSize, borderRadiusSize } from "properties/vars";
import { StyleSheet } from "react-native";

import { generalStyle } from "./generalStyle";

export const inputStyle = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: paddingSize.medium,
    borderRadius: borderRadiusSize.medium,
    borderColor: primaryColors.lightGrey,
    ...generalStyle.basicText,
  },
});

export const dropdownStyle = StyleSheet.create({
  inputIOS: {
    ...inputStyle.input,
  },
  inputAndroid: {
    ...inputStyle.input,
  },
});

export const imagePickerStyle = StyleSheet.create({
  input: {
    paddingHorizontal: paddingSize.xSmall,
    paddingVertical: paddingSize.xxSmall,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...inputStyle.input,
  },
});
