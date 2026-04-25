import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { decodeSharedPayload } from "../lib/sharedRoutineLink";
import { upsertUser } from "../lib/dbQuery";
import type { Day } from "../types/type";

type SaveStatus = "idle" | "saving" | "saved" | "error";

function ImportSharedRoutine() {
  const location = useLocation();
  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const sharedPayload = useMemo(() => {
    return decodeSharedPayload(location.hash);
  }, [location.hash]);

  const isInvalid = !sharedPayload;

  const totalClasses = sharedPayload
    ? Object.values(sharedPayload.routine).reduce((count, daySlots) => count + daySlots.length, 0)
    : 0;
  const days: Day[] = ["SATURDAY", "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY"];

  const handleSave = async () => {
    if (!sharedPayload || saveStatus === "saving") {
      return;
    }

    setSaveStatus("saving");
    try {
      await upsertUser({
        name: sharedPayload.name,
        studentId: sharedPayload.studentId,
        routine: sharedPayload.routine,
      });
      setSaveStatus("saved");
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.error(error);
      setSaveStatus("error");
    }
  };

  if (isInvalid) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#fafafa] p-6 text-center">
        <h1 className="text-2xl font-semibold mb-2">Invalid Share Link</h1>
        <p className="text-neutral-600 mb-6">
          This link is missing data or the data format is not supported.
        </p>
        <button
          type="button"
          className="px-5 py-3 rounded-md bg-neutral-900 text-white"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#fafafa] p-6">
      <div className="w-full max-w-md rounded-xl bg-white border border-neutral-200 shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-4">Import Shared Routine</h1>
        <div className="space-y-2 text-sm text-neutral-700 mb-6">
          <p>
            <span className="font-semibold text-neutral-900">Name:</span> {sharedPayload.name}
          </p>
          <p>
            <span className="font-semibold text-neutral-900">Student ID:</span>{" "}
            {sharedPayload.studentId}
          </p>
          <p>
            <span className="font-semibold text-neutral-900">Total Classes:</span> {totalClasses}
          </p>
        </div>
        <div className="mb-6 max-h-52 overflow-auto rounded-md border border-neutral-200 p-3 text-xs">
          {days.map((day) => (
            <div key={day} className="mb-2 last:mb-0">
              <p className="font-semibold text-neutral-900">{day}</p>
              {sharedPayload.routine[day].length === 0 ? (
                <p className="text-neutral-500">No classes</p>
              ) : (
                sharedPayload.routine[day].map(([course, time], index) => (
                  <p key={`${day}-${index}`} className="text-neutral-700">
                    {time} - {course}
                  </p>
                ))
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="w-full h-11 rounded-md bg-neutral-900 text-white disabled:opacity-60"
          onClick={handleSave}
          disabled={saveStatus === "saving" || saveStatus === "saved"}
        >
          {saveStatus === "saving"
            ? "Saving..."
            : saveStatus === "saved"
              ? "Saved as Friend"
              : "Save as Friend"}
        </button>

        {saveStatus === "error" && (
          <p className="mt-3 text-sm text-red-600">
            Could not save this routine. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}

export default ImportSharedRoutine;
