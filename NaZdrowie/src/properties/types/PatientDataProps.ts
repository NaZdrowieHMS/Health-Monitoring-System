import { DoctorData } from "./DoctorDataProps";

export type PatientData = {
  id: number;
  name: string;
  surname: string;
  email: string;
  pesel: string;
  // last_updated: string;
};

type ResultsDataContent = {
  data: string;
  type: string;
};

export type ResultsData = {
  id: number;
  content: ResultsDataContent;
  test_type: string;
};

export type PatientHealthComment = {
  id: number;
  patient_id: number;
  doctor: DoctorData;
  modified_date: string;
  content: string;
};

export type PatientReferral = {
  referral_id: number;
  comment_id: number;
  doctor_id: number;
  patient_id: number;
  test_type: string;
  referral_number: string;
  completed: boolean;
  comment_content: string;
};

export type PatientResult = {
  id: number;
  patient_id: number;
  test_type: string;
  content: ResultsDataContent;
  ai_selected: boolean;
  viewed: boolean;
};
