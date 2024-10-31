import { cardStyle } from "properties/styles";
import { ObjectCardProps } from "properties/types";
import { fontSize, paddingSize } from "properties/vars";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const objectCardStyle = StyleSheet.create({
  element: {
    display: "flex",
    flexDirection: "row",
    columnGap: paddingSize.small,
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

const ObjectCard: React.FC<ObjectCardProps> = (props: ObjectCardProps) => {
  const { data, keyStyle } = props;

  return (
    <View style={cardStyle.container}>
      {data.map((item, index) => (
        <View style={objectCardStyle.element} key={index}>
          <View style={objectCardStyle.element}>
            <Text style={keyStyle}>{item.key}</Text>
          </View>
          <View style={objectCardStyle.elementButtons}>
            <Text style={objectCardStyle.text}>{item.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ObjectCard;
