import { useState } from "react";
import AddRoutineForm from "./AddRoutineForm";
import { type Person, type CourseRoutine } from "../types/interfaces";
import { addPerson } from "../services/db";

function AddRoutine({
  addRoutine,
}: {
  addRoutine: (isClicked: boolean) => void;
}) {
  const [who, setWho] = useState<"Self" | "Friend">("Self");
  const [routine, setRoutine] = useState<CourseRoutine[]>([]);
  const [idx, setIdx] = useState<number>(0);
  const [showWho, setShowWho] = useState<boolean>(true);

  async function savePerson(personToSave: Person) {
    console.log(personToSave);
    const id: number = await addPerson(personToSave);
    console.log(id);
  }
  const saveRoutine = (courseRoutine: CourseRoutine) => {
    setRoutine((prevRoutine) => [...prevRoutine, courseRoutine]);
    setIdx((idx) => idx + 1);

    // console.log(courseRoutine)
    // console.log(routine)

    const updatedRoutine: CourseRoutine[] = [...routine, courseRoutine];
    console.log(updatedRoutine);

    if (idx === 0) {
      setShowWho(false);
    } else if (idx === 3) {
      const personToSave: Person = {
        name: who,
        courses: [
          updatedRoutine[0],
          updatedRoutine[1],
          updatedRoutine[2],
          updatedRoutine[3],
        ],
      };
      console.log(personToSave);
      savePerson(personToSave);
      addRoutine(false);
    }
  };

  return (
    <>
      <div className="flex-col p-2">
        <div className=" flex justify-end p-1.5">
          <button
            className=" border p-1 w-1/8 rounded-xl "
            onClick={() => addRoutine(false)}
          >
            X
          </button>
        </div>
        {showWho && (
          <div>
            {/* select self or friend */}
            <div
              role="radiogroup"
              className="flex border rounded-lg p-2 gap-4 mt-4 "
            >
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
          </div>
        )}
        {who === "Self" && (
          <AddRoutineForm courseNo={idx} getRoutine={saveRoutine} />
        )}
      </div>
    </>
  );
}

export default AddRoutine;
