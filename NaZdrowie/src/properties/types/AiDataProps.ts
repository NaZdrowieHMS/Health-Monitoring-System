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
  data: {
    status: string;
    sourceResults: number[]; // TODO
    prediction: string;
    confidence: number;
    createdDate: string;
  }[];
};
