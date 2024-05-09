type CommentData = {
  text: string;
  date: string;
  author: string;
};

export type CommentsCardProps = {
  title: string;
  data: CommentData[];
};
