import {
  commentStyle,
  generalStyle,
  resultButtonStyle,
} from "properties/styles";
import { ButtonProps } from "properties/types";
import React from "react";
import { Pressable, Text } from "react-native";
import { formatDate } from "services/utils";

export type ResultButtonElement = ReturnType<typeof ResultButton>;

export const ResultButton: React.FC<ButtonProps & { date: string }> = (
  props: ButtonProps & { date: string }
) => {
  const { handleOnClick, title, date } = props;

  return (
    <Pressable
      style={resultButtonStyle.buttonContainer}
      onPress={handleOnClick}
    >
      <Text style={commentStyle.date}>{formatDate(date)}</Text>
      <Text style={generalStyle.basicText}>{title}</Text>
    </Pressable>
  );
};
