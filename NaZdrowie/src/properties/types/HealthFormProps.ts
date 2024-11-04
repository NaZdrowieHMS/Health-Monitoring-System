export enum HealthFormItemType {
  Input,
  Choice,
}

type HealthFormItem = {
  title: string;
  type: HealthFormItemType;
  placeholder?: string;
};

export type HealthFormProps = {
  patientId: number;
  content: HealthFormItem[];
};

export const healthFormItems: HealthFormItem[] = [
  {
    title: "Temperatura",
    type: HealthFormItemType.Input,
    placeholder: "Temperatura ciała w °C",
  },
  {
    title: "Ciśnienie",
    type: HealthFormItemType.Input,
    placeholder: "np. 120/80",
  },
  {
    title: "Ból głowy",
    type: HealthFormItemType.Choice,
  },
  {
    title: "Ból brzucha",
    type: HealthFormItemType.Choice,
  },
];
