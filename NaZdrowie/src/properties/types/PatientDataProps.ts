import { DoctorData, DoctorDataShort } from "./DoctorDataProps";

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
  testType: string;
};

export type PatientHealthComment = {
  id: number;
  patientId: number;
  doctor: DoctorData;
  modifiedDate: string;
  content: string;
};

export type PatientReferral = {
  referralId: number;
  patientId: number;
  testType: string;
  referralNumber: string;
  completed: boolean;
  doctor: DoctorDataShort;
  Comment: ReferralComment; // change to "comments" after backend endpoitn change
  createdDate: string;
};

export type ReferralComment = {
  doctorAuthor: DoctorDataShort;
  modifiedDate: string;
  content: string;
};

export type PatientResult = {
  id: number;
  patientId: number;
  testType: string;
  content: ResultsDataContent;
  aiSelected: boolean;
  viewed: boolean;
};
