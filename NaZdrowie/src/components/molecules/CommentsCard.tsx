import { LinkButton } from "components/atoms";
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

const ListCard: React.FC<CommentsCardProps> = (props: CommentsCardProps) => {
  const { title, data } = props;

  return (
    <View style={listCardStyle.container}>
      <Text style={listCardStyle.title}>{title}</Text>
      {data.map((item, index) => (
        <View style={listCardStyle.comment} key={index}>
          <Text style={[listCardStyle.text, listCardStyle.date]}>
            {item.date}
          </Text>
          <Text style={listCardStyle.text}>{item.text}</Text>
          <View style={listCardStyle.floatRight}>
            <Text style={[listCardStyle.text, listCardStyle.author]}>
              ~ {item.author}
            </Text>
          </View>
        </View>
      ))}
      <View style={listCardStyle.floatRight}>
        <LinkButton title="Zobacz więcej..." color={primaryColors.lightBlue} />
      </View>
    </View>
  );
};

export default ListCard;
