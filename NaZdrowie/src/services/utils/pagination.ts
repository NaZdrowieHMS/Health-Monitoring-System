import {
  AiResultPredictionsCardCount,
  cardCommentsCount,
  currentDoctorCommentsCount,
  latestCount,
} from "services/config";

export const doctorDataPagination = {
  latestPatients: { pageSize: latestCount },
  currentDotorComments: { pageSize: currentDoctorCommentsCount },
  otherDotorsComments: { pageSize: latestCount - currentDoctorCommentsCount },
  unassignedPatients: null,
  resultComments: { pageSize: cardCommentsCount },
};

export const aiDataPagination = {
  patientPredictions: { pageSize: AiResultPredictionsCardCount },
  patientResultsForAi: null,
};

export const patientDataPagination = {
  referrals: null,
  latestReferrals: null,
  latestHealthComments: { pageSize: latestCount },
  healthComments: null,
};

export const resultsDataPagination = {
  latestResults: { pageSize: latestCount },
  latestUnviewedResults: { pageSize: latestCount },
};
