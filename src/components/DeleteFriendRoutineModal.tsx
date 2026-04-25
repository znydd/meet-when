import { useEffect, useState } from "react";
import type { User } from "../types/type";
import { deleteUser, getUsers, resetAllData } from "../lib/dbQuery";

type LoadStatus = "idle" | "loading" | "error";

function DeleteFriendRoutineModal({
  onClose,
  onChanged,
}: {
  onClose: () => void;
  onChanged?: () => void | Promise<void>;
}) {
  const [friends, setFriends] = useState<User[]>([]);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>("loading");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const loadFriends = async () => {
      setLoadStatus("loading");
      try {
        const users = await getUsers();
        setFriends(users ?? []);
        setLoadStatus("idle");
      } catch (error) {
        console.error(error);
        setLoadStatus("error");
      }
    };

    void loadFriends();
  }, []);

  const handleDeleteFriend = async (studentId: string) => {
    setDeletingId(studentId);
    setErrorMessage("");
    try {
      await deleteUser(studentId);
      setFriends((previous) => previous.filter((friend) => friend.studentId !== studentId));
      if (onChanged) {
        await onChanged();
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Could not delete this friend routine. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleReset = async () => {
    const confirmed = window.confirm(
      "Reset everything? This will remove your routine and all friend routines.",
    );
    if (!confirmed) {
      return;
    }

    setIsResetting(true);
    setErrorMessage("");
    try {
      await resetAllData();
      onClose();
      if (onChanged) {
        await onChanged();
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Could not reset app data. Please try again.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-5 shadow-xl">
        <h2 className="text-center text-xl font-semibold">Manage Friend Routines</h2>
        <p className="mt-1 text-center text-sm text-neutral-600">
          Delete individual friends or reset the full app.
        </p>

        <div className="mt-4 max-h-64 overflow-auto rounded-md border border-neutral-200">
          {loadStatus === "loading" && (
            <p className="p-4 text-sm text-neutral-600">Loading friends...</p>
          )}

          {loadStatus === "error" && (
            <p className="p-4 text-sm text-red-600">Could not load friend routines.</p>
          )}

          {loadStatus === "idle" && friends.length === 0 && (
            <p className="p-4 text-sm text-neutral-600">No friend routines added yet.</p>
          )}

          {loadStatus === "idle" &&
            friends.map((friend) => (
              <div
                key={friend.studentId}
                className="flex items-center justify-between gap-3 border-b border-neutral-200 p-3 last:border-b-0"
              >
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{friend.name}</p>
                  <p className="text-xs text-neutral-600">{friend.studentId}</p>
                </div>
                <button
                  type="button"
                  className="h-9 rounded-md border border-rose-300 bg-rose-50 px-3 text-xs font-semibold text-rose-700 disabled:opacity-60"
                  onClick={() => handleDeleteFriend(friend.studentId)}
                  disabled={Boolean(deletingId) || isResetting}
                >
                  {deletingId === friend.studentId ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
        </div>

        <button
          type="button"
          className="mt-4 h-10 w-full rounded-md border border-red-300 bg-red-50 text-red-700 font-semibold disabled:opacity-60"
          onClick={handleReset}
          disabled={isResetting}
        >
          {isResetting ? "Resetting..." : "Reset Everything"}
        </button>

        {errorMessage && <p className="mt-3 text-sm text-red-600">{errorMessage}</p>}

        <button
          type="button"
          className="mt-3 h-10 w-full rounded-md border border-neutral-300 bg-white"
          onClick={onClose}
          disabled={isResetting}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default DeleteFriendRoutineModal;
