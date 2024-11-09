import { LinkButton, PersonalizedCheckbox } from "components/atoms";
import { cardStyle, generalStyle } from "properties/styles";
import { ListCardProps } from "properties/types";
import React from "react";
import { Text, View } from "react-native";

export const ListCard: React.FC<ListCardProps> = (props: ListCardProps) => {
  const { title, data, handleSeeMore, extraButton } = props;

  return (
    <View style={cardStyle.container}>
      <Text style={generalStyle.titleText}>{title}</Text>
      {data.map((item, index) => (
        <View style={cardStyle.cardElement} key={index}>
          <View style={cardStyle.cardElement}>
            {item.checkbox && (
              <PersonalizedCheckbox
                checkboxStatus={item.checkbox.checkboxStatus}
              />
            )}
            <Text style={generalStyle.basicText}>{item.text}</Text>
          </View>
          <View style={cardStyle.elementButtons}>
            {item.buttons.map((ButtonElement, buttonIndex) => (
              <View key={buttonIndex}>{ButtonElement}</View>
            ))}
          </View>
        </View>
      ))}
      {handleSeeMore && (
        <View style={cardStyle.floatRight}>
          <LinkButton title="Zobacz więcej..." />
        </View>
      )}

      {extraButton && extraButton}
    </View>
  );
};
