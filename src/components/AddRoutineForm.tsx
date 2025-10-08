import { useState } from "react";

function AddRoutineForm({ courseNo, getRoutine }: { courseNo: number, getRoutine: (courseRoutine: string) => void }) {

    const Course: string[] = ["Course 1", "Course 2", "Course 3", "Course 4"]
    const Days: string[] = ["SAT-MON", "SUN-TUE", "MON-WED", "TUE-THU", "THU-SAT"];
    const Day: string[] = ["SAT", "SUN", "MON", "TUE", "WED", "THU"];
    const Slots: string[] = ["08:00-09:20", "09:30-10:50", "11:00-12:20", "12:30-01:50", "02:00-03:20", "03:30-04:50"]
    const LabSlots: string[] = ["08:00-10:50", "11:00-01:50", "02:00-04:50"]


    const [course, setCourse] = useState<string>("");
    const [day, setDay] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [hasLab, setHasLab] = useState<boolean>(false)
    const [labDay, setLabDay] = useState<string>("");
    const [labTime, setLabTime] = useState<string>("");

    const handleAddRoutine = () => {
        getRoutine(course + day + time + hasLab + labTime)
    }


    return (
        <>
            <div className=" my-8">
                {/*Course Name*/}
                <div className="flex-col mb-1 ml-1 ">
                    <span>{Course[courseNo]}:</span>
                    <input
                        type="text"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        placeholder="CSE221"
                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/*Days and Time slots */}
                <div className="flex">
                    <div className=" flex-col w-1/2 mr-0.5">
                        <div>Day</div>
                        <select
                            id="Day"
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            className=" w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {Days.map((day, index) => (
                                <option key={index} value={`${day}`}>{day}</option>
                            ))}
                        </select>
                    </div>
                    <div className=" flex-col w-1/2 ml-0.5">
                        <div>Time</div>
                        <select
                            id="Time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className=" w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {Slots.map((slot, index) => (
                                <option key={index} value={`${slot}`}>{slot}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/*Has lab or Not */}
                <div role="radiogroup" className="flex border rounded-lg p-2 gap-4 mt-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="hasLab"
                            checked={hasLab === false}
                            onChange={() => setHasLab(false)}
                        />
                        <span>No Lab</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="hasLab"
                            checked={hasLab === true}
                            onChange={() => setHasLab(true)}
                        />
                        <span>Lab</span>
                    </label>
                </div>
                {hasLab &&
                    <div className=" flex">
                        <div className=" flex-col w-1/2 mr-0.5">
                            <div>Day</div>
                            <select
                                id="Day"
                                value={labDay}
                                onChange={(e) => setLabDay(e.target.value)}
                                className=" w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {Day.map((day, index) => (
                                    <option key={index} value={`${day}`}>{day}</option>
                                ))}
                            </select>
                        </div>
                        <div className=" flex-col w-1/2 ml-0.5">
                            <div>Time</div>
                            <select
                                id="Time"
                                value={labTime}
                                onChange={(e) => setLabTime(e.target.value)}
                                className=" w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {LabSlots.map((slot, index) => (
                                    <option key={index} value={`${slot}`}>{slot}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                }
                <button
                    className="w-full bg-blue-600 text-white mt-2 py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => handleAddRoutine()}
                >
                    {courseNo === 3 ? "Generate" : "Next"}
                </button>
            </div>
        </>
    )
}

export default AddRoutineForm