export type UserData = {
  id: number;
  isDoctor: boolean;
};

export type UserRegisterData = {
  role: string;
  name: string;
  surname: string;
  email: string;
  pesel: string;
  password: string;
  pwz?: string;
};
