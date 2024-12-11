import { cardStyle, generalStyle } from "properties/styles";
import React from "react";
import { Text, View } from "react-native";

type ErrorCardProps = { title: string; message: string };

export const ErrorCard: React.FC<ErrorCardProps> = (props: ErrorCardProps) => {
  const { title, message } = props;

  return (
    <View style={cardStyle.container}>
      {title && <Text style={generalStyle.titleText}>{title}</Text>}
      <Text style={generalStyle.errorText}>{message}</Text>
    </View>
  );
};
