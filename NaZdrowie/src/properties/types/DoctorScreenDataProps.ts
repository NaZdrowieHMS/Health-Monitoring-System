export type PatientData = {
  id: number;
  name: string;
  surname: string;
  email: string;
  pesel: string;
};

export type ResultsData = {
  id: number;
  content: {
    data: string;
    type: string;
  };
  test_type: string;
};
