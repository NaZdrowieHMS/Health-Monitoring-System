export type DoctorData = {
  id: number;
  name: string;
  surname: string;
  email: string;
  pesel: string;
  pwz: string;
};

export type Author = {
  id: number;
  name: string;
  surname: string;
};

export type DoctorComment = {
  id: number;
  doctor: Author;
  modifiedDate: string;
  content: string;
};

export type PatientReferralUpload = {
  doctorId: number;
  patientId: number;
  testType: string;
  referralNumber: string;
  completed: boolean;
  comment: string;
};

export type AiSelectedChange = {
  resultId: number;
  patientId: number;
  doctorId: number;
};
