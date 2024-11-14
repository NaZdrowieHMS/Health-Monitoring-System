import { commentStyle, generalStyle } from "properties/styles";
import { CommentData } from "properties/types";
import React from "react";
import { Text, View } from "react-native";

export const Comment: React.FC<
  { item: CommentData } & { index: number; dontShowAuthor?: boolean }
> = (
  props: { item: CommentData } & { index: number; dontShowAuthor?: boolean },
) => {
  const { index, item, dontShowAuthor } = props;

  return (
    <View style={commentStyle.comment} key={index}>
      <Text style={[generalStyle.basicText, commentStyle.date]}>
        {item.date}
      </Text>
      <Text style={generalStyle.basicText}>
        {item.text || "Brak komentarzy do wyswietlenia"}
      </Text>
      {!dontShowAuthor && (
        <View style={commentStyle.floatRight}>
          <Text style={[generalStyle.basicText, commentStyle.author]}>
            ~ {item.author}
          </Text>
        </View>
      )}
    </View>
  );
};
