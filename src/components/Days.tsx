import { useState } from "react";
import type { Day } from "../types/interfaces";

function Days({ getDay }: { getDay: (day: Day) => void }) {
  const week: Day[] = ["SAT", "SUN", "MON", "TUE", "WED", "THU"];
  const [dayClicked, setDayClicked] = useState<number>(0);

  // 2. Handler to toggle the state on every click
  const handleClick = (index: number) => {
    setDayClicked(index); // Toggles from true to false and vice-versa
  };
  return (
    <>
      <div className="flex content-center border rounded-lg mt-4 mb-2 mx-2 ">
        {week.map((day, index) => {
          if (index == 0) {
            return (
              <button
                key={index}
                className={`text-center p-4 xs:p-2 border w-1/6 rounded-l-lg ${dayClicked === index ? "bg-blue-300" : ""}`}
                onClick={() => {
                  getDay(day);
                  handleClick(index);
                }}
              >
                {day}
              </button>
            );
          } else if (index == 5) {
            return (
              <button
                key={index}
                className={`text-center p-4 xs:p-2 border w-1/6 rounded-r-lg ${dayClicked === index ? "bg-blue-300" : ""}`}
                onClick={() => {
                  getDay(day);
                  handleClick(index);
                }}
              >
                {day}
              </button>
            );
          } else {
            return (
              <button
                key={index}
                className={`text-center p-4 xs:p-2 border w-1/6 ${dayClicked === index ? "bg-blue-300" : ""}`}
                // className="text-center p-4 xs:p-2 border w-1/6"
                onClick={() => {
                  getDay(day);
                  handleClick(index);
                }}
              >
                {day}
              </button>
            );
          }
        })}
      </div>
    </>
  );
}

export default Days;
