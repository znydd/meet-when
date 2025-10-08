import { useState } from "react"
import Days from "./components/Days"
import Navbar from "./components/Navbar"
import Routine from "./components/Routine"
import AddRoutine from "./components/AddRoutine"

function App() {

  const [addClicked, setAddClicked] = useState<boolean>(false);
  const handleAddClick = (isClicked: boolean) => {
    setAddClicked(isClicked);
  }

  return (
    <>
      {addClicked ? <AddRoutine addRoutine={handleAddClick} /> :
        <div className=" max-h-full">
          <Navbar addRoutine={handleAddClick} />
          <Days />
          <Routine />
        </div>}
    </>
  )
}

export default App
