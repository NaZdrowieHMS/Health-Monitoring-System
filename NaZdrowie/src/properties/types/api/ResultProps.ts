export type ResultContent = {
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
  content: ResultContent;
  viewed?: boolean;
};

export type ResultUpload = {
  patientId: number;
  referralId?: number;
  testType: string;
  content: ResultContent;
};
