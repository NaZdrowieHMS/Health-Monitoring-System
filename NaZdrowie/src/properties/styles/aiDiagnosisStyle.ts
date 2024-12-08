import primaryColors from "properties/colors";
import { fontSize } from "properties/vars";
import { StyleSheet } from "react-native";

export const aiDiagnosis = StyleSheet.create({
  benignPrediction: {
    color: primaryColors.red,
    fontSize: fontSize.secondaryTitleFontSize,
  },
  malignantPrediction: {
    color: primaryColors.red,
    fontSize: fontSize.secondaryTitleFontSize,
  },
  normalPrediction: {
    color: primaryColors.lightGreen,
    fontSize: fontSize.secondaryTitleFontSize,
  },
  otherPrediction: {
    color: primaryColors.lightGreen,
    fontSize: fontSize.secondaryTitleFontSize,
  },
});
