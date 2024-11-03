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
