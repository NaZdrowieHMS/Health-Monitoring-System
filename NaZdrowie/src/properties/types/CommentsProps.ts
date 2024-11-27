import { GestureResponderEvent } from "react-native";
import { DoctorAuthor } from "./api/DoctorDataProps";

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

export type HealthCommentUpload = {
  doctorId: number;
  patientId: number;
  content: string;
};

export type ResultCommentUpload = {
  resultId: number;
  doctorId: number;
  content: string;
};

export type DoctorComment = {
  id: number;
  doctor: DoctorAuthor;
  modifiedDate: string;
  content: string;
};
