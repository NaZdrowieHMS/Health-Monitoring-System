export type AiPrediction = {
  id: number;
  status: PredictionStatus;
  patientId: number;
  doctorId: number;
  createdDate: string;
  modifiedDate: string;
  resultAiAnalysis: ResultAiAnalysis;
  formAiAnalysis: HealthFormAiAnalysis;
};

export enum PredictionStatus {
  inProgress = "IN PROGRESS",
  completed = "COMPLETED",
  failed = "FAILED",
}

export enum PredictionOutcome {
  benign = "benign",
  malignant = "malignant",
  normal = "normal",
}

export type ResultAiAnalysis = {
  results: ResultShortInfo[];
  prediction: PredictionOutcome;
  confidence: number;
};

export type HealthFormAiAnalysis = {
  formId: number;
  diagnoses: string[];
  recommendations: string[];
  formCreatedDate: string;
};

export type AiPredictionInfo = {
  patientId: number;
  doctorId: number;
  resultIds: number[];
};

export type AiAnalysisResultCardProps = {
  title: string;
  aiPrediction: {
    status: PredictionStatus;
    prediction: PredictionOutcome;
    confidence: number;
    sourceResults: { title: string; onClick: () => void }[];
    predictionDate: string;
    diagnoses: string[];
    recommendations: string[];
    healthFormDate: string;
  };
};

export type AiAnalysisHealthFormCardProps = {
  title: string;
  data: HealthFormAiAnalysis;
};

export type ResultShortInfo = {
  resultId: number;
  testType: string;
  createdDate: string;
};

export type ResultChange = {
  resultId: number;
  patientId: number;
  doctorId: number;
};
