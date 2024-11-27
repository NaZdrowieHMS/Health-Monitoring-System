import { DropdownItem } from "components/atoms";
import { ObjectCardElement } from "./components";

export enum HealthFormItemType {
  Input,
  Dropdown,
  Checkbox,
}

type HealthFormItem = {
  title: string;
  type: HealthFormItemType;
  placeholder?: string;
  options?: DropdownItem[];
};

export type HealthFormProps = {
  patientId: number;
  content: HealthFormItem[];
};

const painDropdownItems: DropdownItem[] = [
  { label: "Brak", value: "Brak" },
  { label: "Słaby", value: "Słaby" },
  { label: "Umiarkowany", value: "Umiarkowany" },
  { label: "Silny", value: "Silny" },
];

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
    title: "Cukier",
    type: HealthFormItemType.Input,
    placeholder: "np. 120/80",
  },
  {
    title: "Ból głowy",
    type: HealthFormItemType.Dropdown,
    placeholder: "Wybierz poziom bólu",
    options: painDropdownItems,
  },
  {
    title: "Ból brzucha",
    type: HealthFormItemType.Dropdown,
    placeholder: "Wybierz poziom bólu",
    options: painDropdownItems,
  },
  {
    title: "Ból gardła",
    type: HealthFormItemType.Dropdown,
    placeholder: "Wybierz poziom bólu",
    options: painDropdownItems,
  },
  {
    title: "Ból brzucha",
    type: HealthFormItemType.Dropdown,
    placeholder: "Wybierz poziom bólu",
    options: painDropdownItems,
  },
  {
    title: "Ból mięśni i stawów",
    type: HealthFormItemType.Dropdown,
    placeholder: "Wybierz poziom bólu",
    options: painDropdownItems,
  },
  {
    title: "Kaszel",
    type: HealthFormItemType.Dropdown,
    placeholder: "Wybierz rodzaj kaszlu",
    options: [
      { label: "Brak", value: "Brak" },
      { label: "Suchy", value: "Suchy" },
      { label: "Mokry", value: "Mokry" },
    ],
  },
  {
    title: "Duszności",
    type: HealthFormItemType.Checkbox,
  },
  {
    title: "Zawroty głowy",
    type: HealthFormItemType.Checkbox,
  },
  {
    title: "Biegunka",
    type: HealthFormItemType.Checkbox,
  },
  {
    title: "Wymioty",
    type: HealthFormItemType.Checkbox,
  },
];

export type HealthFormDisplayData = {
  id: number;
  patientId: number;
  createDate: string;
  content: ObjectCardElement[];
};

export type HealthFormUpload = {
  patientId: number;
  content: ObjectCardElement[];
};
