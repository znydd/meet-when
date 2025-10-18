// Per Day focused
export type Day =
  | "SATURDAY"
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY";

export type Time =
  | "08:00-09:20"
  | "09:30-10:50"
  | "11:00-12:20"
  | "12:30-01:50"
  | "02:00-03:20"
  | "03:30-04:50"
  | "08:00-10:50"
  | "11:00-01:50"
  | "02:00-04:50";
export type EachDay = {
  [key in Day]: [string, Time][];
};
export interface User {
  userName: string;
  routine: EachDay;
}

export function isDay(key: string): key is Day {
  return [
    "SATURDAY",
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
  ].includes(key);
}

export function isTime(key: string): key is Time {
  return [
    "08:00-09:20",
    "09:30-10:50",
    "11:00-12:20",
    "12:30-01:50",
    "02:00-03:20",
    "03:30-04:50",
    "08:00-10:50",
    "11:00-01:50",
    "02:00-04:50",
  ].includes(key);
}
