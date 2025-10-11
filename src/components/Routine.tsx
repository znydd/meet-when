import type { SlotObj } from "../services/calcRoutine";
import type { Slot } from "../types/interfaces";

function Routine({ dailyRoutine }: { dailyRoutine: SlotObj }) {
  const slots: Slot[] = [
    "08:00-09:20",
    "09:30-10:50",
    "11:00-12:20",
    "12:30-01:50",
    "02:00-03:20",
    "03:30-04:50",
  ];
  return (
    <>
      <div className=" border rounded-xl mx-2 p-1">
        <h6 className=" ml-2">Routine</h6>
        {slots.map((slot, index) => (
          <div key={index} className=" border rounded-xl my-1 mx-1 h-24 p-1 ">
            <div className="flex ">
              <div className="border-1 border-neutral-400 rounded-lg p-1">
                {slot}
              </div>
              <div
                className={`border-1 border-neutral-400 rounded-lg p-1 ml-2 ${dailyRoutine[slot] === "" ? "hidden" : ""}`}
              >
                {dailyRoutine[slot]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Routine;
