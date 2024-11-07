import { cardStyle, generalStyle } from "properties/styles";
import { ObjectCardProps } from "properties/types";
import React from "react";
import { Text, View } from "react-native";

const ObjectCard: React.FC<ObjectCardProps> = (props: ObjectCardProps) => {
  const { data, keyStyle } = props;

  return (
    <View style={cardStyle.container}>
      {data.map((item, index) => (
        <View style={cardStyle.cardElement} key={index}>
          <View style={cardStyle.cardElement}>
            <Text style={keyStyle}>{item.key}</Text>
          </View>
          <View style={cardStyle.elementButtons}>
            <Text style={generalStyle.basicText}>{item.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ObjectCard;
