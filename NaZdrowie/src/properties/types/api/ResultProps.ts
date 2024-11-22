export type ResultData = {
  data: string;
  type: string;
};

export type ResultOverview = {
  id: number;
  patientId: number;
  testType: string;
  createdDate: string;
  aiSelected?: boolean;
};

export type DetailedResult = ResultOverview & {
  content: ResultData;
  viewed?: boolean;
};

export type ResultUpload = {
  patientId: number;
  referralId?: number;
  testType: string;
  content: ResultData;
};
