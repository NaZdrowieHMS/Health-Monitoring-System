import { DropdownItem } from "components/atoms";

export const formatDate = (unformattedDate: string) => {
  const date = new Date(unformattedDate);
  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

export const resultItems: DropdownItem[] = [
  { label: "USG piersi", value: "USG piersi" },
  { label: "Mammografia", value: "Mammografia" },
];

export enum CommentsFilter {
  Specific = "specific",
  Others = "others",
}
