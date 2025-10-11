import { getPerson } from "./db";
import { type Slot, type Day } from "../types/interfaces";
import { type Person } from "../types/interfaces";

export type SlotObj = {
  [key in Slot]: string;
};

export type DailyRoutine = {
  name: string;
} & {
  [key in Day]: SlotObj;
};

type LabConvert = {
  [key in string]: Slot[];
};

export const routinePerDay: DailyRoutine = {
  name: "",
  SAT: {
    "08:00-09:20": "",
    "09:30-10:50": "",
    "11:00-12:20": "",
    "12:30-01:50": "",
    "02:00-03:20": "",
    "03:30-04:50": "",
  },
  SUN: {
    "08:00-09:20": "",
    "09:30-10:50": "",
    "11:00-12:20": "",
    "12:30-01:50": "",
    "02:00-03:20": "",
    "03:30-04:50": "",
  },
  MON: {
    "08:00-09:20": "",
    "09:30-10:50": "",
    "11:00-12:20": "",
    "12:30-01:50": "",
    "02:00-03:20": "",
    "03:30-04:50": "",
  },
  TUE: {
    "08:00-09:20": "",
    "09:30-10:50": "",
    "11:00-12:20": "",
    "12:30-01:50": "",
    "02:00-03:20": "",
    "03:30-04:50": "",
  },
  WED: {
    "08:00-09:20": "",
    "09:30-10:50": "",
    "11:00-12:20": "",
    "12:30-01:50": "",
    "02:00-03:20": "",
    "03:30-04:50": "",
  },
  THU: {
    "08:00-09:20": "",
    "09:30-10:50": "",
    "11:00-12:20": "",
    "12:30-01:50": "",
    "02:00-03:20": "",
    "03:30-04:50": "",
  },
};

export async function calcRoutine(name: string): Promise<DailyRoutine> {
  const person: Person[] = await getPerson(name);
  const labConvert: LabConvert = {
    "08:00-10:50": ["08:00-09:20", "09:30-10:50"],
    "11:00-01:50": ["11:00-12:20", "12:30-01:50"],
    "02:00-04:50": ["02:00-03:20", "03:30-04:50"],
  };
  if (person) {
    person[0].courses.forEach((course) => {
      const dayOne: Day = course.courseDay.slice(0, 3) as Day;
      const dayTwo = course.courseDay.slice(4) as Day;
      const courseSlot = course.courseSlot;
      routinePerDay[dayOne][courseSlot] = course.courseCode;
      routinePerDay[dayTwo][courseSlot] = course.courseCode;
      if (course.hasLab && course.labDay && course.labTime) {
        const labDay = course.labDay;
        const labTime = labConvert[course.labTime];
        routinePerDay[labDay][labTime[0]] = course.courseCode + "L";
        routinePerDay[labDay][labTime[1]] = course.courseCode + "L";
      }
    });
    return routinePerDay;
  } else {
    console.log("Not found");
    return routinePerDay;
  }
}
