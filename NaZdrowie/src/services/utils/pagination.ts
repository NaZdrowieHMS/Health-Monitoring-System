import {
  AiResultPredictionsCardCount,
  allDoctorCommentsCount,
  cardCommentsCount,
  currentDoctorCommentsCount,
  latestCount,
} from "services/config";

export const doctorDataPagination = {
  latestPatients: { pageSize: latestCount },
  currentDoctorComments: { pageSize: currentDoctorCommentsCount },
  otherDoctorsComments: { pageSize: latestCount - currentDoctorCommentsCount },
  allDoctorsComments: { pageSize: allDoctorCommentsCount },
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
