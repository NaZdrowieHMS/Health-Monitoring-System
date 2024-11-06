import { Comment } from "components/atoms";
import { cardStyle } from "properties/styles";
import { CommentData } from "properties/types";
import React from "react";
import { ScrollView } from "react-native";

import { Overlay } from "./Overlay";

export const CommentsOverlay: React.FC<{
  handleClose: () => void;
  comments: CommentData[];
  title: string;
}> = ({ handleClose, comments, title }) => {
  return (
    <Overlay>
      <Overlay.Container>
        <Overlay.Header title={title} handleClose={handleClose} />
        <Overlay.Body>
          <ScrollView style={cardStyle.container}>
            {comments.map((item, index) => (
              <Comment item={item} index={index} key={index} />
            ))}
          </ScrollView>
        </Overlay.Body>
      </Overlay.Container>
    </Overlay>
  );
};
