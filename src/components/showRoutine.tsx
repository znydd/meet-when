import { useState } from "react";

function ShowRoutine() {
  const week: string[] = ["SAT", "SUN", "MON", "TUE", "WED", "THU"];
  const slots: string[] = [
    "08:00-09:20",
    "09:30-10:50",
    "11:00-12:20",
    "12:30-01:50",
    "02:00-03:20",
    "03:30-04:50",
  ];
  const [clickIndex, setClickIndex] = useState<number | null>(null);
  const handleClick = (index: number) => {
    setClickIndex(index);
    console.log(`Clicked on ${week[index]}`);
  };

  return (
    <>
      <div className="flex flex-col h-screen items-center bg-[#fafafa]">
        <div className="flex content-center border rounded-lg shadow-sm bg-white mt-6 mb-4 w-11/12 min-w-xs max-w-lg h-14 font-sans  text-sm ">
          {week.map((day, index) => {
            if (index == 0) {
              return (
                <div
                  key={index}
                  className={`text-center content-center border-r w-1/6 rounded-l-lg ${index == clickIndex ? "bg-neutral-800 text-white font-semibold" : ""}`}
                  onClick={() => handleClick(index)}
                >
                  {day}
                </div>
              );
            } else if (index == 5) {
              return (
                <div
                  key={index}
                  className={`text-center content-center border-r w-1/6 rounded-r-lg ${index == clickIndex ? "bg-neutral-800 text-white font-semibold" : ""}`}
                  onClick={() => handleClick(index)}
                >
                  {day}
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className={`text-center content-center border-r w-1/6  ${index == clickIndex ? "bg-neutral-800 text-white font-semibold" : ""}`}
                  onClick={() => handleClick(index)}
                >
                  {day}
                </div>
              );
            }
          })}
        </div>

        {slots.map((slot, index) => (
          <div
            key={index}
            className=" flex flex-col h-28 w-11/12 border-1 border-neutral-600 rounded-t-xl rounded-b-lg mb-2 min-w-xs max-w-lg  bg-white"
          >
            <div className=" flex gap-8 px-3 py-1 bg-neutral-800 text-white rounded-t-lg text-sm xs:text-[16px]">
              <div>{slot}</div>
              <div className="">CSE321 -21 -HFN-09A-07C</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ShowRoutine;
