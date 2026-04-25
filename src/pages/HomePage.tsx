import ShowRoutine from "../components/showRoutine.tsx";
import InitialUserInput from "../pages/InitialUserInput.tsx";
import { useState, useEffect, useCallback } from "react";
import type { User } from "../types/type.ts";
import { getAdmin, getUsers } from "../lib/dbQuery";
import { useNavigate } from "react-router";
import FloatingNavBar from "../components/FloatingNavBar.tsx";

function HomePage() {
  const navigate = useNavigate();
  const [showRoutine, setShowRoutine] = useState<boolean>(false);
  const [routine, setRoutine] = useState<User | null>(null);
  const [friends, setFriends] = useState<User[]>([]);

  const loadRoutines = useCallback(async () => {
    try {
      const [adminResponse, friendsResponse]: [User[] | null, User[] | null] = await Promise.all([
        getAdmin(),
        getUsers(),
      ]);
      if (adminResponse && adminResponse.length > 0) {
        setRoutine(adminResponse[0]);
        setFriends(friendsResponse ?? []);
        setShowRoutine(true);
      } else {
        setShowRoutine(false);
        setRoutine(null);
        setFriends([]);
        navigate("/input");
      }
    } catch (error) {
      console.error(error);
    }
  }, [navigate]);

  useEffect(() => {
    void loadRoutines();
  }, [loadRoutines]);

  return (
    <>
      <div className=" h-screen">
        {showRoutine && routine ? (
          <div>
            <ShowRoutine routine={routine} friends={friends} />
            <FloatingNavBar onFriendSaved={loadRoutines} />
          </div>
        ) : (
          <InitialUserInput />
        )}
      </div>
    </>
  );
}

export default HomePage;
