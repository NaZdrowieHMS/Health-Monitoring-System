export type AiPrediction = {
  id: number;
  status: string;
  patientId: number;
  doctorId: number;
  resultIds: number[];
  prediction: string;
  confidence: number;
  createdDate: string;
  modifiedDate: string;
};

export type AiPredictionInfo = {
  patientId: number;
  doctorId: number;
  resultIds: number[];
};

export type AiAnalysisResultCardProps = {
  title: string;
  data: {
    status: string;
    sourceResults: number[]; // TODO
    prediction: string;
    confidence: number;
    createdDate: string;
  }[];
};

export type AiAnalysisHealthFormCardProps = {
  title: string;
  data: AiHealthFormAnalysis;
};

export type AiSelectedChange = {
  resultId: number;
  patientId: number;
  doctorId: number;
};

export type AiHealthFormAnalysis = {
  id: number;
  patientId: number;
  formId: number;
  diagnoses: string[];
  recommendations: string[];
  createdDate: string;
};
