export const patientKeys = {
  allHealthComments: (userId: number) =>
    [userId, "healthComments", "all"] as const,
  limitedHealthComments: (userId: number, limit: number) =>
    [userId, "healthComments", `limit${limit}`] as const,

  allReferrals: (userId: number) => [userId, "referrals", "all"] as const,
  limitedReferrals: (userId: number, limit: number) =>
    [userId, "referrals", `limit${limit}`] as const,
  referral: (userId: number, referralId: number) =>
    [userId, "referrals", referralId] as const,

  allResults: (userId: number) => [userId, "results", "all"] as const,
  limitedResults: (userId: number, limit: number) =>
    [userId, "results", `limit${limit}`] as const,
  result: (userId: number, resultId: number) =>
    [userId, "results", resultId] as const,
  resultData: (userId: number, resultId: number) =>
    [userId, "results", resultId, "data"] as const,

  allHealthForms: (userId: number) => [userId, "healthForms", "all"] as const,
  latestHealthForm: (userId: number) =>
    [userId, "healthForms", "latest"] as const,
  healthForm: (userId: number, healthFormId: number) =>
    [userId, "healthForms", healthFormId] as const,
};

export const doctorKeys = {
  resultsUnviewed: (userId: number) => [userId, "results", "unviewed"] as const,
  allPatientsUnassigned: (userId: number) =>
    [userId, "patients", "unassigned", "all"] as const,
  patientUnassigned: (userId: number, patientId: number) =>
    [userId, "patients", "unassigned", patientId] as const,

  patient: {
    allHealthComments: (userId: number, patientId: number) =>
      [userId, ...patientKeys.allHealthComments(patientId)] as const,
    limitedHealthComments: (userId: number, patientId: number, limit: number) =>
      [userId, ...patientKeys.limitedHealthComments(patientId, limit)] as const,

    allReferrals: (userId: number, patientId: number) =>
      [userId, ...patientKeys.allReferrals(patientId)] as const,
    limitedReferrals: (userId: number, patientId: number, limit: number) =>
      [userId, ...patientKeys.limitedReferrals(patientId, limit)] as const,
    referral: (userId: number, patientId: number, referralId: number) =>
      [userId, ...patientKeys.referral(patientId, referralId)] as const,

    allResults: (userId: number, patientId: number) =>
      [userId, ...patientKeys.allResults(patientId)] as const,
    limitedResults: (userId: number, patientId: number, limit: number) =>
      [userId, ...patientKeys.limitedResults(patientId, limit)] as const,
    result: (userId: number, patientId: number, resultId: number) =>
      [userId, ...patientKeys.result(patientId, resultId)] as const,
    resultData: (userId: number, patientId: number, resultId: number) =>
      [userId, ...patientKeys.resultData(patientId, resultId)] as const,

    allHealthForms: (userId: number, patientId: number) =>
      [userId, ...patientKeys.allHealthForms(patientId)] as const,
    latestHealthForm: (userId: number, patientId: number) =>
      [userId, ...patientKeys.latestHealthForm(patientId)] as const,
    healthForm: (userId: number, patientId: number, healthFormId: number) =>
      [userId, ...patientKeys.healthForm(patientId, healthFormId)] as const,
  },
};
