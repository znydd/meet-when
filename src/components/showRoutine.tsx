import { useState, useMemo } from "react";
import type { Day, Time, User } from "../types/type";

function ShowRoutine({ routine }: { routine: User }) {
  const week: Day[] = [
    "SATURDAY",
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
  ];
  const convert: Record<Day, string> = {
    SATURDAY: "SAT",
    SUNDAY: "SUN",
    MONDAY: "MON",
    TUESDAY: "TUE",
    WEDNESDAY: "WED",
    THURSDAY: "THU",
  };
  const slots: Time[] = [
    "08:00-09:20",
    "09:30-10:50",
    "11:00-12:20",
    "12:30-01:50",
    "02:00-03:20",
    "03:30-04:50",
  ];
  const restructuredRoutine = useMemo(() => {
    console.log("Restructuring the entire routine...");
    const mainRoutine = routine.routine;
    const entries = Object.keys(mainRoutine) as Day[];
    const allDayEntries: Record<Day, Partial<Record<Time, string>>> = {
      SATURDAY: {},
      SUNDAY: {},
      MONDAY: {},
      TUESDAY: {},
      WEDNESDAY: {},
      THURSDAY: {},
    };

    entries.forEach((key) => {
      allDayEntries[key] = {};
      mainRoutine[key].forEach((slot) => {
        if (slot) {
          const time = slot[1];
          const course = slot[0];
          if (
            time === "08:00-10:50" ||
            time === "11:00-01:50" ||
            time === "02:00-04:50"
          ) {
            let time1: Time = time;
            let time2: Time = time;
            if (time === "08:00-10:50") {
              time1 = "08:00-09:20";
              time2 = "09:30-10:50";
            } else if (time === "11:00-01:50") {
              time1 = "11:00-12:20";
              time2 = "12:30-01:50";
            } else if (time === "02:00-04:50") {
              time1 = "02:00-03:20";
              time2 = "03:30-04:50";
            }
            allDayEntries[key][time1] = course;
            allDayEntries[key][time2] = course;
          } else {
            allDayEntries[key][time] = course;
          }
        }
      });
    });
    return allDayEntries;
  }, [routine]);

  const [selectedDay, setSelectedDay] = useState<Day>("SATURDAY");
  const [clickIndex, setClickIndex] = useState<number>(0);

  const handleClick = (index: number) => {
    setClickIndex(index);
    setSelectedDay(week[index]);
    console.log(`Clicked on ${week[index]}`);
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
                  className={`text-center content-center border-r w-1/6 rounded-l-lg ${index == clickIndex ? "bg-neutral-800 text-white font-semibold" : ""}`}
                  onClick={() => handleClick(index)}
                >
                  {convert[day]}
                </div>
              );
            } else if (index == 5) {
              return (
                <div
                  key={index}
                  className={`text-center content-center border-r w-1/6 rounded-r-lg ${index == clickIndex ? "bg-neutral-800 text-white font-semibold" : ""}`}
                  onClick={() => handleClick(index)}
                >
                  {convert[day]}
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className={`text-center content-center border-r w-1/6  ${index == clickIndex ? "bg-neutral-800 text-white font-semibold" : ""}`}
                  onClick={() => handleClick(index)}
                >
                  {convert[day]}
                </div>
              );
            }
          })}
        </div>

        {slots.map((slot, index) => (
          <div
            key={index}
            className={`flex flex-col h-28 w-11/12 border-1 border-neutral-600 rounded-t-xl rounded-b-lg mb-2 min-w-xs max-w-lg ${restructuredRoutine[selectedDay][slot] ? "bg-rose-200 " : ""}`}
          >
            <div>
              <div className=" flex gap-6 px-3 py-1 bg-neutral-800 text-white rounded-t-lg text-sm xs:text-[16px]">
                <div>{slot}</div>
                <div className="">{restructuredRoutine[selectedDay][slot]}</div>
              </div>
            </div>

            {restructuredRoutine[selectedDay][slot] && (
              <div className="relative border-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5 max-lg:h-66 max-lg:border-t lg:border-l dark:[--pattern-fg:var(--color-white)]/10"></div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ShowRoutine;
