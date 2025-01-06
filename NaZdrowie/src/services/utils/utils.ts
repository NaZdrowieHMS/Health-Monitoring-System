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

export const formatShortDate = (unformattedDate: string) => {
  const date = new Date(unformattedDate);
  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour12: false,
  }).format(date);
};

export const resultItems: DropdownItem[] = [
  { label: "Cytologia", value: "Cytologia" },
  { label: "EKG", value: "EKG" },
  { label: "Gastroskopia", value: "Gastroskopia" },
  { label: "Kolonoskopia", value: "Kolonoskopia" },
  { label: "Mammografia", value: "Mammografia" },
  { label: "Tomografia", value: "Tomografia" },
  { label: "USG jamy brzusznej", value: "USG jamy brzusznej" },
  { label: "USG piersi", value: "USG piersi" },
];

export enum CommentsFilter {
  Specific = "specific",
  Others = "others",
}

export function parsePeselToDateOfBirth(pesel: string): string | null {
  if (!/^\d{11}$/.test(pesel)) {
    return null;
  }

  const year = parseInt(pesel.slice(0, 2), 10);
  let month = parseInt(pesel.slice(2, 4), 10);
  const day = parseInt(pesel.slice(4, 6), 10);

  let fullYear;

  if (month >= 1 && month <= 12) {
    fullYear = 1900 + year;
  } else if (month >= 21 && month <= 32) {
    fullYear = 2000 + year;
    month -= 20;
  } else if (month >= 41 && month <= 52) {
    fullYear = 2100 + year;
    month -= 40;
  } else if (month >= 61 && month <= 72) {
    fullYear = 2200 + year;
    month -= 60;
  } else if (month >= 81 && month <= 92) {
    fullYear = 1800 + year;
    month -= 80;
  } else {
    return null;
  }

  const dateOfBirth = new Date(fullYear, month - 1, day);
  if (
    dateOfBirth.getFullYear() !== fullYear ||
    dateOfBirth.getMonth() + 1 !== month ||
    dateOfBirth.getDate() !== day
  ) {
    return "";
  }

  return dateOfBirth.toISOString().split("T")[0];
}
