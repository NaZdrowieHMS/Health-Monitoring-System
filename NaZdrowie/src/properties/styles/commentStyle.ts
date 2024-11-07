import primaryColors from "properties/colors";
import { paddingSize, fontSize } from "properties/vars";
import { StyleSheet } from "react-native";

export const commentStyle = StyleSheet.create({
  comment: {
    display: "flex",
    rowGap: paddingSize.xSmall,
  },
  date: {
    color: primaryColors.lightBlue,
  },
  author: {
    fontSize: fontSize.smallFontSize,
  },
  floatRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
