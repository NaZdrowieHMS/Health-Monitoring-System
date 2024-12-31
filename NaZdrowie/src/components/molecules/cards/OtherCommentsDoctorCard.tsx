import React from "react";
import { Comment } from "components/atoms";
import { cardStyle, generalStyle } from "properties/styles";
import { Text, View } from "react-native";
import { CommentData } from "properties/types";

export const OtherCommentsDoctorCard: React.FC<{
  dataOthers: CommentData[];
  title: string;
}> = (props) => {
  const { dataOthers, title } = props;

  return (
    <View style={cardStyle.container}>
      <Text style={generalStyle.keyText}>{title}</Text>
      {dataOthers.map((item, index) => (
        <Comment item={item} index={index} key={index} />
      ))}
    </View>
  );
};
