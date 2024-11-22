export * from "./AiDataProps";
export * from "./ButtonProps";
export * from "./ConfigProps";
export * from "./DoctorDataProps";
export * from "./InputProps";
export * from "./ListCardProps";
export * from "./ObjectCardProps";
export * from "./PatientDataProps";
export * from "./HealthFormProps";
export * from "./CommentsProps";

export type StringNavigation = {
  navigate: (value: string, params?: object) => void;
};
