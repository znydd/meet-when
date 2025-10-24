import ShowRoutine from "../components/showRoutine.tsx";
import InitialUserInput from "../pages/InitialUserInput.tsx";
import { useState, useEffect } from "react";
import type { User } from "../types/type.ts";
import { getAdmin } from "../lib/dbQuery";
import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();
  const [showRoutine, setShowRoutine] = useState<boolean>(false);
  const [routine, setRoutine] = useState<User | null>(null);
  useEffect(() => {
    // We moved the logic inside and made it an async IIFE
    // (Immediately Invoked Function Expression)
    (async () => {
      try {
        const response: User[] | null = await getAdmin();
        if (response && response.length > 0) {
          setRoutine(response[0]);
          setShowRoutine(true);
        } else {
          navigate("/input");
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [navigate]);
  return (
    <>
      <div className=" h-screen">
        {showRoutine && routine ? (
          <ShowRoutine routine={routine} />
        ) : (
          <InitialUserInput />
        )}
      </div>
    </>
  );
}

export default HomePage;
