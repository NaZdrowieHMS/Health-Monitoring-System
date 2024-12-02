import { UserData } from "properties/types";
import {
  useFetchHealthComments,
  useSendHealthComment,
} from "services/commentsData";
import {
  CommentsFilter,
  doctorDataPagination,
  patientDataPagination,
} from "services/utils";
import { formatCommentsData } from "./dataFormatHelpers";

export const useCommentsData = (currentUser: UserData, patientId?: number) => {
  const prepareHealthComments = () =>
    useFetchHealthComments(
      currentUser,
      (data) => data.map(formatCommentsData),
      patientDataPagination.healthComments,
      patientId,
    );

  const prepareLatestHealthComments = () =>
    useFetchHealthComments(
      currentUser,
      (data) => data.map(formatCommentsData),
      patientDataPagination.latestHealthComments,
      patientId,
    );

  const healthCommentUpload = {
    sendComment: useSendHealthComment(currentUser),
    comment: {
      doctorId: currentUser.id,
      patientId: patientId,
      content: "",
    },
  };

  const prepareCurrentDotorComments = () =>
    useFetchHealthComments(
      currentUser,
      (data) => data.map(formatCommentsData),
      doctorDataPagination.currentDotorComments,
      patientId,
      CommentsFilter.Specific,
    );

  const prepareOtherDotorsComments = () =>
    useFetchHealthComments(
      currentUser,
      (data) => data.map(formatCommentsData),
      doctorDataPagination.otherDotorsComments,
      patientId,
      CommentsFilter.Others,
    );

  return {
    prepareHealthComments,
    prepareLatestHealthComments,
    healthCommentUpload,
    prepareCurrentDotorComments,
    prepareOtherDotorsComments,
  };
};
