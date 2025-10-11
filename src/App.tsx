import { useEffect, useState } from "react";
import Days from "./components/Days";
import Navbar from "./components/Navbar";
import Routine from "./components/Routine";
import AddRoutine from "./components/AddRoutine";
import { calcRoutine, type DailyRoutine } from "./services/calcRoutine";
import { type Day } from "./types/interfaces";

function App() {
  const [addClicked, setAddClicked] = useState<boolean>(false);
  const [day, setDay] = useState<Day>("SAT");
  const [person, setPerson] = useState<DailyRoutine | null>(null);
  const handleAddClick = (isClicked: boolean) => {
    setAddClicked(isClicked);
  };
  function handleGetDay(day: Day) {
    setDay(day);
  }
  useEffect(() => {
    async function getPerson() {
      try {
        const personData: DailyRoutine = await calcRoutine("Self");
        setPerson(personData);
      } catch (error) {
        console.error("Failed to load routine:", error);
      }
    }
    getPerson();
  }, []);

  return (
    <>
      {addClicked ? (
        <AddRoutine addRoutine={handleAddClick} />
      ) : (
        <div className=" max-h-full">
          <Navbar addRoutine={handleAddClick} />
          <Days getDay={handleGetDay} />
          {person && <Routine dailyRoutine={person[day]} />}
        </div>
      )}
    </>
  );
}

export default App;
