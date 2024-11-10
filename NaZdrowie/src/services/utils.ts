import { DropdownItem } from "components/atoms";
import { DoctorComment, CommentData } from "properties/types";

export const formatDate = (unformattedDate: string) => {
  const date = new Date(unformattedDate);
  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

export const formatCommentsData = (comment: DoctorComment): CommentData => ({
  date: formatDate(comment.modifiedDate),
  text: comment.content,
  author: `${comment.doctor.name} ${comment.doctor.surname}`,
});

export const resultItems: DropdownItem[] = [
  { label: "USG piersi", value: "USG piersi" },
  { label: "Mammografia", value: "Mammografia" },
];
