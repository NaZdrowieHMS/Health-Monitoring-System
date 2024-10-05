import { LinkButton, Comment } from "components/atoms";
import primaryColors from "properties/colors";
import cardStyle from "properties/styles/cardStyle";
import {
  CommentData,
  CommentsCardProps,
} from "properties/types/CommentsCardProps";
import { fontSize } from "properties/vars";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

const listCardStyle = StyleSheet.create({
  secondaryTitle: {
    fontSize: fontSize.baseMobileFontSize,
    color: primaryColors.darkBlue,
  },
});

const CommentsCardForDoctor: React.FC<
  CommentsCardProps & { dataOthers: CommentData[] }
> = (props: CommentsCardProps & { dataOthers: CommentData[] }) => {
  const { title, data, dataOthers } = props;

  return (
    <View style={cardStyle.container}>
      <Text style={cardStyle.title}>{title}</Text>
      <Text style={listCardStyle.secondaryTitle}>Twoje komentarze</Text>
      {/* TODO Comment input */}
      {data.map((item, index) => (
        <Comment item={item} index={index} key={index} />
      ))}
      <Text style={listCardStyle.secondaryTitle}>Pozostałe komentarze</Text>
      {dataOthers.map((item, index) => (
        <Comment item={item} index={index} key={index} />
      ))}
      <View style={cardStyle.floatRight}>
        <LinkButton title="Zobacz więcej..." color={primaryColors.lightBlue} />
      </View>
    </View>
  );
};

export default CommentsCardForDoctor;
