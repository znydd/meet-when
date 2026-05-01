import ShowRoutine from "../components/showRoutine.tsx";
import { useState, useEffect, useCallback } from "react";
import type { User } from "../types/type.ts";
import { getAdmin, getUsers } from "../lib/dbQuery";
import { useNavigate } from "react-router";
import FloatingNavBar from "../components/FloatingNavBar.tsx";
import StartupLoadingScreen from "../components/StartupLoadingScreen.tsx";

function HomePage() {
  const navigate = useNavigate();
  const [isBootLoading, setIsBootLoading] = useState<boolean>(true);
  const [showRoutine, setShowRoutine] = useState<boolean>(false);
  const [routine, setRoutine] = useState<User | null>(null);
  const [friends, setFriends] = useState<User[]>([]);

  const loadRoutines = useCallback(async () => {
    setIsBootLoading(true);
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
    } finally {
      setIsBootLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    void loadRoutines();
  }, [loadRoutines]);

  if (isBootLoading) {
    return <StartupLoadingScreen />;
  }
  if (!showRoutine || !routine) {
    return null;
  }

  return (
    <>
      <div className=" h-screen">
        <div>
          <ShowRoutine routine={routine} friends={friends} />
          <FloatingNavBar onDataChanged={loadRoutines} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
