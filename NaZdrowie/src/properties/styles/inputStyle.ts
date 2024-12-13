import primaryColors from "properties/colors";
import { paddingSize, borderRadiusSize } from "properties/vars";
import { StyleSheet } from "react-native";

import { generalStyle } from "./generalStyle";

export const inputStyle = StyleSheet.create({
  input: {
    flexGrow: 1,
    borderWidth: 1,
    padding: paddingSize.medium,
    borderRadius: borderRadiusSize.medium,
    borderColor: primaryColors.lightGrey,
    ...generalStyle.basicText,
    backgroundColor: primaryColors.white,
    ...generalStyle.rowSpread,
  },
});

export const imagePickerStyle = StyleSheet.create({
  input: {
    paddingHorizontal: paddingSize.xSmall,
    paddingVertical: paddingSize.xxSmall,
    alignItems: "center",
    ...inputStyle.input,
    ...generalStyle.rowSpread,
  },
});
