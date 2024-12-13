import { cardStyle, generalStyle } from "properties/styles";
import { ObjectCardProps } from "properties/types";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Text, View } from "react-native";
import primaryColors from "properties/colors";

export const ObjectCard: React.FC<ObjectCardProps> = (
  props: ObjectCardProps,
) => {
  const { data, keyStyle } = props;

  return (
    <View style={cardStyle.container}>
      {data.map((item, index) => (
        <View style={cardStyle.cardElement} key={index}>
          <View style={cardStyle.cardElement}>
            <Text style={keyStyle}>{item.key}</Text>
          </View>
          <View style={cardStyle.elementButtons}>
            <Text style={generalStyle.basicText}>
              {item.value == "true" ? (
                <AntDesign
                  name="checkcircleo"
                  size={24}
                  color={primaryColors.lightGreen}
                />
              ) : item.value == "false" ? (
                <AntDesign
                  name="closecircleo"
                  size={24}
                  color={primaryColors.red}
                />
              ) : item.value == "" ? (
                "Nie podano"
              ) : (
                item.value
              )}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
