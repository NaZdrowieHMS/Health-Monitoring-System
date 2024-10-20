import primaryColors from "properties/colors";
import { CommentData } from "properties/types";
import { fontSize, paddingSize } from "properties/vars";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

const listCardStyle = StyleSheet.create({
  comment: {
    display: "flex",
    rowGap: paddingSize.xSmall,
  },
  text: {
    fontSize: fontSize.baseMobileFontSize,
    color: primaryColors.darkGrey,
  },
  date: {
    color: primaryColors.lightBlue,
  },
  author: {
    fontSize: fontSize.smallFontSize,
  },
  floatRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

const Comment: React.FC<{ item: CommentData } & { index: number }> = (
  props: { item: CommentData } & { index: number },
) => {
  const { index, item } = props;

  return (
    <View style={listCardStyle.comment} key={index}>
      <Text style={[listCardStyle.text, listCardStyle.date]}>{item.date}</Text>
      <Text style={listCardStyle.text}>{item.text}</Text>
      <View style={listCardStyle.floatRight}>
        <Text style={[listCardStyle.text, listCardStyle.author]}>
          ~ {item.author}
        </Text>
      </View>
    </View>
  );
};

export default Comment;
