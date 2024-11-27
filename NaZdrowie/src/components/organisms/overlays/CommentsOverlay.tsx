import { Comment } from "components/atoms";
import { CommentData } from "properties/types";
import React from "react";

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
          {comments.map((item, index) => (
            <Comment item={item} index={index} key={index} />
          ))}
        </Overlay.Body>
      </Overlay.Container>
    </Overlay>
  );
};
