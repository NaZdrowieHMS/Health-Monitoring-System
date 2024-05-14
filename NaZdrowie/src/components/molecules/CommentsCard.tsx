import { LinkButton, Comment } from "components/atoms";
import primaryColors from "properties/colors";
import { CommentsCardProps } from "properties/types/CommentsCardProps";
import { borderRadiusSize, fontSize, paddingSize } from "properties/vars";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

const listCardStyle = StyleSheet.create({
  container: {
    backgroundColor: primaryColors.white,
    flexGrow: 1,
    paddingHorizontal: paddingSize.medium,
    paddingVertical: paddingSize.mediumBig,
    rowGap: paddingSize.medium,
    borderRadius: borderRadiusSize.small,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  title: {
    fontSize: fontSize.buttonMobileFontSize,
    color: primaryColors.darkBlue,
  },
  floatRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

const CommentsCard: React.FC<CommentsCardProps> = (
  props: CommentsCardProps,
) => {
  const { title, data } = props;

  return (
    <View style={listCardStyle.container}>
      <Text style={listCardStyle.title}>{title}</Text>
      {data.map((item, index) => (
        <Comment item={item} index={index} />
      ))}
      <View style={listCardStyle.floatRight}>
        <LinkButton title="Zobacz więcej..." color={primaryColors.lightBlue} />
      </View>
    </View>
  );
};

export default CommentsCard;
