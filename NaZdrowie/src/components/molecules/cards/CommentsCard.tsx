import { LinkButton, Comment } from "components/atoms";
import { cardStyle, generalStyle } from "properties/styles";
import { CommentsCardProps } from "properties/types";
import React from "react";
import { Text, View } from "react-native";

export const CommentsCard: React.FC<CommentsCardProps> = (
  props: CommentsCardProps,
) => {
  const { title, data, handleSeeMore } = props;

  return (
    <View style={cardStyle.container}>
      <Text style={generalStyle.titleText}>{title}</Text>
      {data.map((item, index) => (
        <Comment item={item} index={index} key={index} />
      ))}
      <View style={cardStyle.floatRight}>
        <LinkButton title="Zobacz więcej..." handleOnClick={handleSeeMore} />
      </View>
    </View>
  );
};
