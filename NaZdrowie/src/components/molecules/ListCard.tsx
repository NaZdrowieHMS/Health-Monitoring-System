import primaryColors from "properties/colors";
import { ListCardType } from "properties/types/ListCardType";
import { borderRadiusSize, fontSize, paddingSize } from "properties/vars";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

function ListCard(_props: ListCardType) {
  const { title, data } = _props;
  const listCardStyle = StyleSheet.create({
    container: {
      backgroundColor: primaryColors.white,
      flexGrow: 1,
      paddingHorizontal: paddingSize.medium,
      paddingVertical: paddingSize.mediumBig,
      rowGap: paddingSize.mediumBig,
      borderRadius: borderRadiusSize.small,
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 0.25,
    },
    title: {
      fontSize: fontSize.buttonMobileFontSize,
      color: primaryColors.darkBlue,
    },
  });

  return (
    <View style={listCardStyle.container}>
      <Text style={listCardStyle.title}>{title}</Text>
    </View>
  );
}

export default ListCard;
