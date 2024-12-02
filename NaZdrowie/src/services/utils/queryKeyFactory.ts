import { PaginationData } from "properties/types/api";
import { CommentsFilter } from ".";

export const patientKeys = {
  info: (userId: number) => [userId, "details"] as const,
  healthComments: {
    list: (userId: number, limit?: PaginationData, filter?: CommentsFilter) =>
      [userId, "healthComments", limit ? limit : "all", filter] as const,
    core: (userId: number) => [userId, "healthComments"] as const,
  },
  referrals: {
    list: (userId: number, limit?: PaginationData) =>
      [userId, "referrals", limit ? limit : "all"] as const,
    specific: (userId: number, referralId: number) =>
      [userId, "referrals", referralId] as const,
    core: (userId: number) => [userId, "referrals"] as const,
  },

  results: {
    list: (userId: number, limit?: PaginationData) =>
      [userId, "results", limit ? limit : "all"] as const,
    specific: (userId: number, resultId: number) =>
      [userId, "results", resultId] as const,
    specificContent: (userId: number, resultId: number) =>
      [userId, "results", resultId, "data"] as const,
    specificComments: (
      userId: number,
      resultId: number,
      limit?: PaginationData,
    ) =>
      [userId, "results", resultId, "comments", limit ? limit : "all"] as const,
    core: (userId: number) => [userId, "results"] as const,
  },
  healthForms: {
    list: (userId: number, limit?: PaginationData) =>
      [userId, "healthForms", limit ? limit : "all"] as const,
    specific: (userId: number, healthFormId: number) =>
      [userId, "healthForms", healthFormId] as const,
    core: (userId: number) => [userId, "healthForms"] as const,
  },
};

export const doctorKeys = {
  resultsUnviewed: (userId: number) => [userId, "results", "unviewed"] as const,
  patients: {
    unassigned: {
      list: (userId: number, limit?: PaginationData) =>
        [userId, "patients", "unassigned", limit ? limit : "all"] as const,
      core: (userId: number) => [userId, "patients", "unassigned"] as const,
    },
    list: (userId: number, limit?: PaginationData) =>
      [userId, "patients", limit ? limit : "all"] as const,
    core: (userId: number) => [userId, "patients"] as const,
  },
  patient: {
    specific: (userId: number, patientId: number) =>
      [userId, patientKeys.info(patientId)] as const,
    healthComments: {
      list: (
        userId: number,
        patientId: number,
        limit?: PaginationData,
        filter?: CommentsFilter,
      ) =>
        [
          userId,
          ...patientKeys.healthComments.list(patientId, limit, filter),
        ] as const,
      core: (userId: number, patientId: number) =>
        [userId, ...patientKeys.healthComments.core(patientId)] as const,
    },
    referrals: {
      list: (userId: number, patientId: number, limit?: PaginationData) =>
        [userId, ...patientKeys.referrals.list(patientId, limit)] as const,
      specific: (userId: number, patientId: number, referralId: number) =>
        [
          userId,
          ...patientKeys.referrals.specific(patientId, referralId),
        ] as const,
      core: (userId: number, patientId: number) =>
        [userId, ...patientKeys.referrals.core(patientId)] as const,
    },
    results: {
      list: (userId: number, patientId: number, limit?: PaginationData) =>
        [userId, ...patientKeys.results.list(patientId, limit)] as const,
      specific: (userId: number, patientId: number, resultId: number) =>
        [userId, ...patientKeys.results.specific(patientId, resultId)] as const,
      specificContent: (userId: number, patientId: number, resultId: number) =>
        [
          userId,
          ...patientKeys.results.specificContent(patientId, resultId),
        ] as const,
      specificComments: (
        userId: number,
        patientId: number,
        resultId: number,
        pagination?: PaginationData,
      ) =>
        [
          userId,
          ...patientKeys.results.specificComments(
            patientId,
            resultId,
            pagination,
          ),
        ] as const,
      core: (userId: number, patientId: number) =>
        [userId, ...patientKeys.results.core(patientId)] as const,
    },
    healthForms: {
      list: (userId: number, patientId: number, limit?: PaginationData) =>
        [userId, ...patientKeys.healthForms.list(patientId, limit)] as const,
      specific: (userId: number, patientId: number, healthFormId: number) =>
        [
          userId,
          ...patientKeys.healthForms.specific(patientId, healthFormId),
        ] as const,
      core: (userId: number, patientId: number) =>
        [userId, ...patientKeys.healthForms.core(patientId)] as const,
    },
    predictions: {
      list: (userId: number, patientId: number, limit?: PaginationData) =>
        [userId, patientId, "predictions", limit ? limit : "all"] as const,
      specific: (userId: number, patientId: number, predictionId: number) =>
        [userId, patientId, "predictions", predictionId] as const,
      core: (userId: number, patientId: number) =>
        [userId, patientId, "predictions"] as const,
    },
  },
};
