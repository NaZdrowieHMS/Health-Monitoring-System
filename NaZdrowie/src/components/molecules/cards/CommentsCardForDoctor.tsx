import { UseMutationResult } from "@tanstack/react-query";
import {
  LinkButton,
  Comment,
  PersonalizedTextInput,
  SendButton,
} from "components/atoms";
import { cardStyle, generalStyle } from "properties/styles";
import {
  CommentData,
  CommentsCardProps,
  HealthCommentUpload,
} from "properties/types";
import React, { useState } from "react";
import { Text, View } from "react-native";

export const CommentsCardForDoctor: React.FC<
  CommentsCardProps & {
    dataOthers: CommentData[];
    commentUpload?: {
      sendComment: UseMutationResult<HealthCommentUpload, Error>;
      comment: HealthCommentUpload;
    };
  }
> = (props) => {
  const { title, data, dataOthers, commentUpload } = props;
  const [comment, setComment] = useState<string>();

  const handleSendComment = () => {
    if (comment.length > 0) {
      commentUpload.comment.content = comment;
      commentUpload.sendComment.mutateAsync(commentUpload.comment); // here you can define onSuccess, onError and onSettled logic
    }
  };

  return (
    <View style={cardStyle.container}>
      <Text style={generalStyle.titleText}>{title}</Text>
      {commentUpload && (
        <PersonalizedTextInput
          placeholder="Wpisz nowy komentarz"
          onChange={setComment}
          iconButton={<SendButton handleOnClick={handleSendComment} />}
        />
      )}
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
