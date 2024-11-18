import {
  LinkButton,
  Comment,
  PersonalizedTextInput,
  SendButton,
} from "components/atoms";
import { cardStyle, generalStyle } from "properties/styles";
import { CommentData, CommentsCardProps } from "properties/types";
import React, { useState } from "react";
import { Text, View } from "react-native";

export const CommentsCardForDoctor: React.FC<
  CommentsCardProps & { dataOthers: CommentData[] }
> = (props: CommentsCardProps & { dataOthers: CommentData[] }) => {
  const { title, data, dataOthers } = props;
  const [comment, setComment] = useState<string>();

  return (
    <View style={cardStyle.container}>
      <Text style={generalStyle.titleText}>{title}</Text>
      <PersonalizedTextInput
        placeholder="Wpisz nowy komentarz"
        onChange={setComment}
        iconButton={<SendButton handleOnClick={() => console.log("send")} />}
      />
      <Text style={generalStyle.keyText}>Twój ostatni komentarz</Text>
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
