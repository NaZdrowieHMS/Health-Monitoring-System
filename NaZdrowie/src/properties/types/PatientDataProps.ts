import { Author } from "./DoctorDataProps";

export type PatientData = {
  id: number;
  name: string;
  surname: string;
  email: string;
  pesel: string;
};

type ResultDataContent = {
  data: string;
  type: string;
};

export type Comment = {
  id: number;
  doctor: Author;
  modifiedDate: string;
  content: string;
};

export type PatientReferral = {
  referralId: number;
  patientId: number;
  testType: string;
  referralNumber: string;
  completed: boolean;
  doctor: Author;
  comment: Comment;
  createdDate: string;
};

export type PatientResult = {
  id: number;
  patientId: number;
  testType: string;
  content: ResultDataContent;
  createdDate: string;
};
