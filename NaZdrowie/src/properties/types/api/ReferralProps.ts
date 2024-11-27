import { DoctorComment } from "../CommentsProps";
import { DoctorAuthor } from "./DoctorDataProps";

export type ReferralUpload = {
  doctorId: number;
  patientId: number;
  testType: string;
  referralNumber: string;
  completed: boolean;
  comment: string;
};

export type Referral = {
  id: number;
  patientId: number;
  testType: string;
  referralNumber: string;
  completed: boolean;
  doctor: DoctorAuthor;
  comment: DoctorComment;
  createdDate: string;
};
