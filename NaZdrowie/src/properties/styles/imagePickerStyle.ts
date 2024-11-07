import primaryColors from "properties/colors";
import { paddingSize, borderRadiusSize } from "properties/vars";
import { StyleSheet } from "react-native";

export const imagePickerStyle = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingHorizontal: paddingSize.xSmall,
    paddingVertical: paddingSize.xxSmall,
    borderRadius: borderRadiusSize.medium,
    borderColor: primaryColors.lightGrey,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
