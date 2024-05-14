import { GestureResponderEvent } from "react-native";

export type CommentData = {
  text: string;
  date: string;
  author: string;
};

export type CommentsCardProps = {
  title: string;
  data: CommentData[];
  handleSeeMore?: (event: GestureResponderEvent) => void;
};
