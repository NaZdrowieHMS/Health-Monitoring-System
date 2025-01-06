import { UseMutationResult } from "@tanstack/react-query";
import { Comment, PersonalizedTextInput, SendButton } from "components/atoms";
import { cardStyle, generalStyle } from "properties/styles";
import { CommentsCardProps, HealthCommentUpload } from "properties/types";
import React, { useState } from "react";
import { Text, View } from "react-native";

export const CurrentCommentDoctorCard: React.FC<
  CommentsCardProps & {
    commentUpload?: {
      sendComment: UseMutationResult<HealthCommentUpload, Error>;
      comment: HealthCommentUpload;
    };
  }
> = (props) => {
  const { data, commentUpload } = props;
  const [comment, setComment] = useState<string>();

  const handleSendComment = async () => {
    if (comment.length > 0) {
      if (comment.trim().length > 0) {
        commentUpload.comment.content = comment;
        await commentUpload.sendComment.mutateAsync(commentUpload.comment);
        setComment("");
      }
    }
  };

  return (
    <View style={cardStyle.container}>
      {commentUpload && (
        <PersonalizedTextInput
          placeholder="Wpisz nowy komentarz"
          onChange={setComment}
          value={comment}
          iconButton={<SendButton handleOnClick={handleSendComment} />}
        />
      )}
      <Text style={generalStyle.keyText}>Twój ostatni komentarz</Text>
      {data.map((item, index) => (
        <Comment item={item} index={index} key={index} />
      ))}
    </View>
  );
};
