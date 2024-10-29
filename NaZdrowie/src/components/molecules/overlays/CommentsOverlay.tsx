import { Comment } from "components/atoms";
import cardStyle from "properties/styles/cardStyle";
import { CommentData } from "properties/types";
import React from "react";
import { View } from "react-native";

import Overlay from "./Overlay";

const CommentsOverlay: React.FC<{
  isVisible: boolean;
  handleClose: () => void;
  comments: CommentData[];
  title: string;
}> = ({ isVisible, handleClose, comments, title }) => {
  return (
    <Overlay isVisible={isVisible}>
      <Overlay.Container>
        <Overlay.Header title={title} handleClose={handleClose} />
        <Overlay.Body>
          <View style={cardStyle.container}>
            {comments.map((item, index) => (
              <Comment item={item} index={index} />
            ))}
          </View>
        </Overlay.Body>
      </Overlay.Container>
    </Overlay>
  );
};

export default CommentsOverlay;
