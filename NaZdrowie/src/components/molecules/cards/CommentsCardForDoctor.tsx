import { LinkButton, Comment } from "components/atoms";
import primaryColors from "properties/colors";
import { cardStyle, generalStyle } from "properties/styles";
import { CommentData, CommentsCardProps } from "properties/types";
import React from "react";
import { Text, View } from "react-native";

const CommentsCardForDoctor: React.FC<
  CommentsCardProps & { dataOthers: CommentData[] }
> = (props: CommentsCardProps & { dataOthers: CommentData[] }) => {
  const { title, data, dataOthers } = props;

  return (
    <View style={cardStyle.container}>
      <Text style={generalStyle.titleText}>{title}</Text>
      <Text style={generalStyle.keyText}>Twoje komentarze</Text>
      {/* TODO Comment input */}
      {data.map((item, index) => (
        <Comment item={item} index={index} key={index} />
      ))}
      <Text style={generalStyle.keyText}>Pozostałe komentarze</Text>
      {dataOthers.map((item, index) => (
        <Comment item={item} index={index} key={index} />
      ))}
      <View style={cardStyle.floatRight}>
        <LinkButton title="Zobacz więcej..." />
      </View>
    </View>
  );
};

export default CommentsCardForDoctor;
