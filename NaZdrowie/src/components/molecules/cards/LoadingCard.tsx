import { LoadingIcon } from "components/atoms";
import { cardStyle, generalStyle } from "properties/styles";
import React from "react";
import { Text, View } from "react-native";

const LoadingCard: React.FC<{ title?: string }> = (props: {
  title?: string;
}) => {
  const { title } = props;

  return (
    <View style={cardStyle.container}>
      {title && <Text style={generalStyle.titleText}>{title}</Text>}
      <LoadingIcon />
    </View>
  );
};

export default LoadingCard;
