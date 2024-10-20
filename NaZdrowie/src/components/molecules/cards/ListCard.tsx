import { LinkButton } from "components/atoms";
import AiSelectCheckbox from "components/atoms/AiCheckbox";
import primaryColors from "properties/colors";
import cardStyle from "properties/styles/cardStyle";
import { ListCardProps } from "properties/types";
import { fontSize, paddingSize } from "properties/vars";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

const listCardStyle = StyleSheet.create({
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

const ListCard: React.FC<ListCardProps> = (props: ListCardProps) => {
  const { title, data, handleSeeMore, extraButton } = props;

  return (
    <View style={cardStyle.container}>
      <Text style={cardStyle.title}>{title}</Text>
      {data.map((item, index) => (
        <View style={listCardStyle.element} key={index}>
          <View style={listCardStyle.element}>
            {item.checkbox && (
              <AiSelectCheckbox checkboxStatus={item.checkbox.checkboxStatus} />
            )}
            <Text style={listCardStyle.text}>{item.text}</Text>
          </View>
          <View style={listCardStyle.elementButtons}>
            {item.buttons.map((ButtonElement, buttonIndex) => ButtonElement)}
          </View>
        </View>
      ))}
      {handleSeeMore && (
        <View style={cardStyle.floatRight}>
          <LinkButton
            title="Zobacz więcej..."
            color={primaryColors.lightBlue}
          />
        </View>
      )}

      {extraButton && extraButton}
    </View>
  );
};

export default ListCard;
