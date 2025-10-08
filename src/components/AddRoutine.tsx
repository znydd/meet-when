import { useState } from "react";
import AddRoutineForm from "./AddRoutineForm";

function AddRoutine({ addRoutine }: { addRoutine: (isClicked: boolean) => void }) {

    const [who, setWho] = useState<"Self" | "Friend">("Self");
    const [routine, setRoutine] = useState<string[]>([])
    const [idx, setIdx] = useState<number>(0)
    const [showWho, setShowWho] = useState<boolean>(true);

    const saveRoutine = (courseRoutine: string) => {
        setRoutine([...routine, courseRoutine])
        const newRoutine = [...routine, courseRoutine];

        setIdx((idx) => idx + 1)
        console.log(courseRoutine)
        console.log(newRoutine)
        if (idx === 3) {
            addRoutine(false);
        }
        if (idx === 0) {
            setShowWho(false)
        }

    }


    return (
        <>
            <div className="flex-col p-2">
                <div className=" flex justify-end p-1.5">
                    <button className=" border p-1 w-1/8 rounded-xl " onClick={() => addRoutine(false)}>
                        X
                    </button>
                </div>
                {showWho && <div>
                    {/* select self or friend */}
                    <div role="radiogroup" className="flex border rounded-lg p-2 gap-4 mt-4 ">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="who"
                                value="Self"
                                checked={who === "Self"}
                                onChange={() => setWho("Self")}
                            />
                            <span>Self</span>
                        </label>

                        {/* Friend */}
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="who"
                                value="Friend"
                                checked={who === "Friend"}
                                onChange={() => setWho("Friend")}
                            />
                            <span>Friend</span>
                        </label>
                    </div>
                </div >}
                <AddRoutineForm courseNo={idx} getRoutine={saveRoutine} />
            </div >
        </>
    )
}

export default AddRoutine

