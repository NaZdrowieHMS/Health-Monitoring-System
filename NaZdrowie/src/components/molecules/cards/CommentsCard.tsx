import { LinkButton, Comment } from "components/atoms";
import primaryColors from "properties/colors";
import cardStyle from "properties/styles/cardStyle";
import { CommentsCardProps } from "properties/types";
import React from "react";
import { Text, View } from "react-native";

const CommentsCard: React.FC<CommentsCardProps> = (
  props: CommentsCardProps,
) => {
  const { title, data, handleSeeMore } = props;

  return (
    <View style={cardStyle.container}>
      <Text style={cardStyle.title}>{title}</Text>
      {data.map((item, index) => (
        <Comment item={item} index={index} key={index} />
      ))}
      <View style={cardStyle.floatRight}>
        <LinkButton
          title="Zobacz więcej..."
          color={primaryColors.lightBlue}
          handleOnClick={handleSeeMore}
        />
      </View>
    </View>
  );
};

export default CommentsCard;
