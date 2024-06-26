import {
  PatientData,
  ResultsData,
} from "properties/types/DoctorScreenDataProps";

export const getLatestPatients: () => PatientData[] = () => {
  return [
    { patientId: 1, patientName: "Alicja Kowalska" },
    { patientId: 2, patientName: "Zuzanna Mikulska" },
    { patientId: 5, patientName: "Alicja Balala" },
    { patientId: 7, patientName: "Alicja Balala" },
  ];
};

export const getLatestResults: () => (ResultsData & PatientData)[] = () => {
  return [
    {
      patientId: 1,
      patientName: "Alicja Kowalska",
      resultId: 2,
      resultName: "USG piersi",
    },
    {
      patientId: 2,
      patientName: "Zuzanna Mikulska",
      resultId: 3,
      resultName: "Mammografia",
    },
    {
      patientId: 5,
      patientName: "Alicja Balala",
      resultId: 4,
      resultName: "USG piersi",
    },
    {
      patientId: 7,
      patientName: "Alicja Balala",
      resultId: 4,
      resultName: "USG piersi",
    },
  ];
};

export const getAllPatients: () => PatientData[] = () => {
  return [
    { patientId: 1, patientName: "Alicja Kowalska" },
    { patientId: 2, patientName: "Zuzanna Mikulska" },
    { patientId: 5, patientName: "Alicja Balala" },
    { patientId: 6, patientName: "Alicja Kajak" },
    { patientId: 7, patientName: "Alicja Tarara" },
    { patientId: 9, patientName: "Alicja Balala" },
  ];
};
