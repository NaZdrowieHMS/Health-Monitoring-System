import primaryColors from "properties/colors";
import { ListCardProps } from "properties/types/ListCardProps";
import { borderRadiusSize, fontSize, paddingSize } from "properties/vars";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

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
  element: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  elementButtons: {
    display: "flex",
    flexDirection: "row",
    columnGap: paddingSize.xSmall,
  },
  text: {
    fontSize: fontSize.baseMobileFontSize,
  },
});

const ListCard: React.FC<ListCardProps> = (props: ListCardProps) => {
  const { title, data } = props;

  return (
    <View style={listCardStyle.container}>
      <Text style={listCardStyle.title}>{title}</Text>
      {data.map((item, index) => (
        <View style={listCardStyle.element} key={index}>
          <Text style={listCardStyle.text}>{item.text}</Text>
          <View style={listCardStyle.elementButtons}>
            {item.buttons.map((ButtonElement, buttonIndex) => ButtonElement)}
          </View>
        </View>
      ))}
    </View>
  );
};

export default ListCard;
