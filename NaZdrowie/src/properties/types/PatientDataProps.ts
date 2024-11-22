import { Author, DoctorComment } from "./DoctorDataProps";

export type PatientData = {
  id: number;
  name: string;
  surname: string;
  email: string;
  pesel: string;
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
