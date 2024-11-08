import { Author, DoctorComment } from "./DoctorDataProps";

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

export type PatientReferral = {
  id: number;
  patientId: number;
  testType: string;
  referralNumber: string;
  completed: boolean;
  doctor: Author;
  comment: DoctorComment;
  createdDate: string;
};

export type PatientResult = {
  id: number;
  patientId: number;
  testType: string;
  content: ResultDataContent;
  createdDate: string;
};

export type ResultUpload = {
  patientId: number;
  referralId?: number;
  testType: string;
  content: ResultDataContent;
};

export type UserData = {
  id: number;
  isDoctor: boolean;
};
