import type { Day, EachDay, Time, User } from "../types/type";

export const WEEK_DAYS: Day[] = [
  "SATURDAY",
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
];

export const DISPLAY_SLOTS: Time[] = [
  "08:00-09:20",
  "09:30-10:50",
  "11:00-12:20",
  "12:30-01:50",
  "02:00-03:20",
  "03:30-04:50",
];

const expandedTimeMap: Record<Time, Time[]> = {
  "08:00-09:20": ["08:00-09:20"],
  "09:30-10:50": ["09:30-10:50"],
  "11:00-12:20": ["11:00-12:20"],
  "12:30-01:50": ["12:30-01:50"],
  "02:00-03:20": ["02:00-03:20"],
  "03:30-04:50": ["03:30-04:50"],
  "08:00-10:50": ["08:00-09:20", "09:30-10:50"],
  "11:00-01:50": ["11:00-12:20", "12:30-01:50"],
  "02:00-04:50": ["02:00-03:20", "03:30-04:50"],
};

export type RestructuredRoutine = Record<Day, Partial<Record<Time, string>>>;

export interface MeetFriend {
  studentId: string;
  name: string;
  color: "green" | "red";
}

export type MeetSuggestions = Record<Day, Partial<Record<Time, MeetFriend[]>>>;

export function restructureRoutine(routine: EachDay): RestructuredRoutine {
  const allDayEntries: RestructuredRoutine = {
    SATURDAY: {},
    SUNDAY: {},
    MONDAY: {},
    TUESDAY: {},
    WEDNESDAY: {},
    THURSDAY: {},
  };

  for (const day of WEEK_DAYS) {
    for (const [course, time] of routine[day]) {
      for (const slot of expandedTimeMap[time]) {
        allDayEntries[day][slot] = course;
      }
    }
  }

  return allDayEntries;
}

export function buildMeetSuggestions(myRoutine: EachDay, friends: User[]): MeetSuggestions {
  const myGrid = restructureRoutine(myRoutine);
  const friendGrids = friends.map((friend) => ({
    friend,
    grid: restructureRoutine(friend.routine),
  }));

  const suggestions: MeetSuggestions = {
    SATURDAY: {},
    SUNDAY: {},
    MONDAY: {},
    TUESDAY: {},
    WEDNESDAY: {},
    THURSDAY: {},
  };

  for (const day of WEEK_DAYS) {
    for (const slot of DISPLAY_SLOTS) {
      if (myGrid[day][slot]) {
        suggestions[day][slot] = [];
        continue;
      }

      const freeFriends: MeetFriend[] = [];
      for (const { friend, grid } of friendGrids) {
        if (grid[day][slot]) {
          continue;
        }

        const hasClassOnThatDay = DISPLAY_SLOTS.some((daySlot) => Boolean(grid[day][daySlot]));
        freeFriends.push({
          studentId: friend.studentId,
          name: friend.name,
          color: hasClassOnThatDay ? "green" : "red",
        });
      }

      freeFriends.sort((a, b) => a.name.localeCompare(b.name));
      suggestions[day][slot] = freeFriends;
    }
  }

  return suggestions;
}
