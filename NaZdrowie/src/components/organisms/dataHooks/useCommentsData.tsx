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
    sendComment: useSendHealthComment(currentUser, patientId),
    comment: {
      doctorId: currentUser.id,
      patientId: patientId,
      content: "",
    },
  };

  const prepareCurrentDoctorComments = () =>
    useFetchHealthComments(
      currentUser,
      (data) => data.map(formatCommentsData),
      doctorDataPagination.currentDoctorComments,
      patientId,
      CommentsFilter.Specific,
    );

  const prepareOtherDoctorsComments = () =>
    useFetchHealthComments(
      currentUser,
      (data) => data.map(formatCommentsData),
      doctorDataPagination.otherDoctorsComments,
      patientId,
      CommentsFilter.Others,
    );

  const prepareAllDoctorsComments = () =>
    useFetchHealthComments(
      currentUser,
      (data) => data.map(formatCommentsData),
      doctorDataPagination.allDoctorsComments,
      patientId,
    );

  return {
    prepareHealthComments,
    prepareLatestHealthComments,
    healthCommentUpload,
    prepareCurrentDoctorComments,
    prepareOtherDoctorsComments,
    prepareAllDoctorsComments,
  };
};
