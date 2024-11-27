import {
  DoctorComment,
  CommentData,
  ObjectCardElement,
  Referral,
} from "properties/types";
import { formatDate } from "services/utils";

export const formatCommentsData = (comment: DoctorComment): CommentData => ({
  date: formatDate(comment.modifiedDate),
  text: comment.content,
  author: `${comment.doctor.name} ${comment.doctor.surname}`,
});

export const formatReferralInfo = (referral: Referral): ObjectCardElement[] => {
  return [
    {
      key: "Data wystawienia",
      value: formatDate(referral.createdDate),
    },
    {
      key: "Wystawiający",
      value: "dr " + referral.doctor.name + " " + referral.doctor.surname,
    },
    {
      key: "Rodzaj badania:",
      value: referral.testType,
    },
  ];
};
