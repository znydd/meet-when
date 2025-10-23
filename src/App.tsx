import PWABadge from "./PWABadge.tsx";
import ShowRoutine from "./components/showRoutine.tsx";
import InitialUserInput from "./components/initialUserInput.tsx";
import { useState, useEffect } from "react";
import type { User } from "./types/type.ts";
import { getAdmin } from "./lib/dbQuery";

function App() {
  const [showRoutine, setShowRoutine] = useState<boolean>(false);
  const [routine, setRoutine] = useState<User | null>(null);
  const adminCheck = async () => {
    try {
      const response: User[] | null = await getAdmin();
      if (response && response.length > 0) {
        setRoutine(response[0]);
      }
      setShowRoutine(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleShowRoutine = (inputDone: boolean) => {
    if (inputDone) {
      setShowRoutine(true);
    }
  };

  useEffect(() => {
    adminCheck();
  }, []);

  return (
    <>
      <div>
        {showRoutine && routine ? (
          <ShowRoutine routine={routine} />
        ) : (
          <InitialUserInput onInputDone={handleShowRoutine} />
        )}
        <PWABadge />
      </div>
    </>
  );
}

export default App;
