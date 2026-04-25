import { useEffect, useMemo, useState } from "react";
import type { Day, User } from "../types/type";
import {
  buildMeetSuggestions,
  DISPLAY_SLOTS,
  restructureRoutine,
  WEEK_DAYS,
} from "../lib/meetSuggestions";

function getCurrentRoutineDay(): Day {
  const today = new Date().getDay();

  if (today === 6) {
    return "SATURDAY";
  }
  if (today === 0) {
    return "SUNDAY";
  }
  if (today === 1) {
    return "MONDAY";
  }
  if (today === 2) {
    return "TUESDAY";
  }
  if (today === 3) {
    return "WEDNESDAY";
  }
  if (today === 4) {
    return "THURSDAY";
  }

  // Friday is outside this routine view, so we start from Saturday.
  return "SATURDAY";
}

function ShowRoutine({ routine, friends }: { routine: User; friends: User[] }) {
  const week: Day[] = WEEK_DAYS;
  const convert: Record<Day, string> = {
    SATURDAY: "SAT",
    SUNDAY: "SUN",
    MONDAY: "MON",
    TUESDAY: "TUE",
    WEDNESDAY: "WED",
    THURSDAY: "THU",
  };
  const slots = DISPLAY_SLOTS;

  const restructuredRoutine = useMemo(() => {
    return restructureRoutine(routine.routine);
  }, [routine]);

  const meetSuggestions = useMemo(() => {
    return buildMeetSuggestions(routine.routine, friends);
  }, [routine, friends]);

  const [selectedDay, setSelectedDay] = useState<Day>(() => getCurrentRoutineDay());
  const activeIndex = week.indexOf(selectedDay);

  useEffect(() => {
    const syncToToday = () => {
      setSelectedDay(getCurrentRoutineDay());
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncToToday();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const handleClick = (index: number) => {
    setSelectedDay(week[index]);
  };

  return (
    <>
      <div className="flex flex-col pb-32  items-center bg-[#fafafa]">
        <div className="flex sticky top-2 z-10 content-center border rounded-lg shadow-md bg-white mt-6 mb-4 w-11/12 min-w-xs max-w-lg h-14 font-sans  text-sm ">
          {week.map((day, index) => {
            if (index == 0) {
              return (
                <div
                  key={index}
                  className={`text-center content-center border-r w-1/6 rounded-l-lg ${index == activeIndex ? "bg-neutral-800 text-white font-semibold" : ""}`}
                  onClick={() => handleClick(index)}
                >
                  {convert[day]}
                </div>
              );
            } else if (index == 5) {
              return (
                <div
                  key={index}
                  className={`text-center content-center border-r w-1/6 rounded-r-lg ${index == activeIndex ? "bg-neutral-800 text-white font-semibold" : ""}`}
                  onClick={() => handleClick(index)}
                >
                  {convert[day]}
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className={`text-center content-center border-r w-1/6  ${index == activeIndex ? "bg-neutral-800 text-white font-semibold" : ""}`}
                  onClick={() => handleClick(index)}
                >
                  {convert[day]}
                </div>
              );
            }
          })}
        </div>

        <div className="w-11/12 min-w-xs max-w-lg mb-2 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-emerald-300 bg-emerald-100 px-3 py-1 text-emerald-700">
            Green: free in this period
          </span>
          <span className="rounded-full border border-rose-300 bg-rose-100 px-3 py-1 text-rose-700">
            Red: no class that day
          </span>
        </div>

        {slots.map((slot) => {
          const ownCourse = restructuredRoutine[selectedDay][slot];
          const freeFriends = meetSuggestions[selectedDay][slot] ?? [];

          return (
            <div
              key={slot}
              className={`flex flex-col w-11/12 border-1 border-neutral-600 rounded-t-xl rounded-b-lg mb-2 min-w-xs max-w-lg overflow-hidden ${ownCourse ? "h-28 bg-rose-200" : "min-h-28"}`}
            >
              <div>
                <div className=" flex gap-6 px-3 py-1 bg-neutral-800 text-white rounded-t-lg text-sm xs:text-[16px]">
                  <div>{slot}</div>
                  <div className="">{ownCourse}</div>
                </div>
              </div>

              {ownCourse && (
                <div className="relative flex-1 border-(--pattern-fg) border-t bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5 dark:[--pattern-fg:var(--color-white)]/10"></div>
              )}

              {!ownCourse && freeFriends.length > 0 && (
                <div className="flex flex-wrap gap-2 p-1">
                  {freeFriends.map((friend) => (
                    <span
                      key={`${slot}-${friend.studentId}`}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${friend.color === "red" ? "border-rose-300 bg-rose-100 text-rose-700" : "border-emerald-300 bg-emerald-100 text-emerald-700"}`}
                    >
                      {friend.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ShowRoutine;
