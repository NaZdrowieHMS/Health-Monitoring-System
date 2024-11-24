export const patientKeys = {
  listLimitedHealthComments: (userId: number, limit?: number) =>
    [userId, "healthComments", limit ? `limit${limit}` : "all"] as const,

  listReferrals: (userId: number, limit?: number) =>
    [userId, "referrals", limit ? `limit${limit}` : "all"] as const,
  referral: (userId: number, referralId: number) =>
    [userId, "referrals", referralId] as const,

  listResults: (userId: number, limit?: number) =>
    [userId, "results", limit ? `limit${limit}` : "all"] as const,
  result: (userId: number, resultId: number) =>
    [userId, "results", resultId] as const,
  resultData: (userId: number, resultId: number) =>
    [userId, "results", resultId, "data"] as const,

  listHealthForm: (userId: number, limit?: number) =>
    [userId, "healthForms", limit ? `limit${limit}` : "all"] as const,
  healthForm: (userId: number, healthFormId: number) =>
    [userId, "healthForms", healthFormId] as const,
};

export const doctorKeys = {
  resultsUnviewed: (userId: number) => [userId, "results", "unviewed"] as const,
  patientsUnassigned: (userId: number, patientId?: number) =>
    [userId, "patients", "unassigned", patientId ? "all" : patientId] as const,

  patient: {
    listLimitedHealthComments: (
      userId: number,
      patientId: number,
      limit?: number,
    ) =>
      [
        userId,
        ...patientKeys.listLimitedHealthComments(patientId, limit),
      ] as const,

    listReferrals: (userId: number, patientId: number, limit?: number) =>
      [userId, ...patientKeys.listReferrals(patientId, limit)] as const,
    referral: (userId: number, patientId: number, referralId: number) =>
      [userId, ...patientKeys.referral(patientId, referralId)] as const,

    listResults: (userId: number, patientId: number, limit?: number) =>
      [userId, ...patientKeys.listResults(patientId, limit)] as const,
    result: (userId: number, patientId: number, resultId?: number) =>
      [userId, ...patientKeys.result(patientId, resultId)] as const,
    resultData: (userId: number, patientId: number, resultId?: number) =>
      [userId, ...patientKeys.resultData(patientId, resultId)] as const,

    listHealthForm: (userId: number, patientId: number, limit?: number) =>
      [userId, ...patientKeys.listHealthForm(patientId, limit)] as const,
    healthForm: (userId: number, patientId: number, healthFormId?: number) =>
      [userId, ...patientKeys.healthForm(patientId, healthFormId)] as const,
  },
};

export const userKeys = {
  userData: ["userData"] as const,
};
