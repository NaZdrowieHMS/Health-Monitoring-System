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
import { useScreensNavigation } from "components/organisms";

export const CommentsCardForDoctor: React.FC<
  CommentsCardProps & {
    patientId: number;
    dataOthers: CommentData[];
    commentUpload?: {
      sendComment: UseMutationResult<HealthCommentUpload, Error>;
      comment: HealthCommentUpload;
    };
  }
> = (props) => {
  const { patientId, title, data, dataOthers, commentUpload } = props;
  const [comment, setComment] = useState<string>();

  const { navigateToAllHealthComments } = useScreensNavigation();

  const handleSendComment = async () => {
    if (comment.length > 0) {
      if (comment.trim().length > 0) {
        commentUpload.comment.content = comment;
        try {
          await commentUpload.sendComment.mutateAsync(commentUpload.comment);
          setComment("");
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <View style={cardStyle.container}>
      <Text style={generalStyle.titleText}>{title}</Text>
      {commentUpload && (
        <PersonalizedTextInput
          placeholder="Wpisz nowy komentarz"
          onChange={setComment}
          value={comment}
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
        <LinkButton
          title="Zobacz więcej..."
          handleOnClick={() => navigateToAllHealthComments(patientId)}
        />
      </View>
    </View>
  );
};
