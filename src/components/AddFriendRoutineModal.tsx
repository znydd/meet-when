import { useMemo, useState } from "react";
import { decodeSharedPayload } from "../lib/sharedRoutineLink";
import { getUser, upsertUser } from "../lib/dbQuery";

type SaveStatus = "idle" | "saving" | "saved" | "error";

function AddFriendRoutineModal({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved?: () => void | Promise<void>;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const [previewTriggered, setPreviewTriggered] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [isExistingUser, setIsExistingUser] = useState<boolean>(false);

  const payload = useMemo(() => {
    if (!previewTriggered) {
      return null;
    }
    return decodeSharedPayload(inputValue);
  }, [inputValue, previewTriggered]);

  const totalClasses = payload
    ? Object.values(payload.routine).reduce((count, slots) => count + slots.length, 0)
    : 0;

  const handlePreview = async () => {
    setPreviewTriggered(true);
    setSaveStatus("idle");

    const parsed = decodeSharedPayload(inputValue);
    if (!parsed) {
      setIsExistingUser(false);
      return;
    }

    const existing = await getUser(parsed.studentId);
    setIsExistingUser(Boolean(existing));
  };

  const handleSave = async () => {
    if (!payload) {
      return;
    }

    setSaveStatus("saving");
    try {
      await upsertUser({
        name: payload.name,
        studentId: payload.studentId,
        routine: payload.routine,
      });
      setSaveStatus("saved");
      if (onSaved) {
        await onSaved();
      }
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.error(error);
      setSaveStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-5 shadow-xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-neutral-300 text-3xl font-semibold">
          +
        </div>

        <h2 className="text-center text-xl font-semibold">Add Friend Routine</h2>
        <p className="mt-1 text-center text-sm text-neutral-600">
          Paste encoded routine or import URL, then preview and save.
        </p>

        <textarea
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Paste encoded routine here..."
          className="mt-4 h-28 w-full rounded-md border border-neutral-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800/20"
        />

        <button
          type="button"
          className="mt-3 h-11 w-full rounded-md bg-neutral-900 text-white"
          onClick={handlePreview}
        >
          Preview
        </button>

        {previewTriggered && !payload && (
          <p className="mt-3 text-sm text-red-600">Invalid encoded routine. Please check and paste again.</p>
        )}

        {payload && (
          <div className="mt-4 rounded-md border border-neutral-200 p-3">
            <p className="text-sm">
              <span className="font-semibold">Name:</span> {payload.name}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Student ID:</span> {payload.studentId}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Total Classes:</span> {totalClasses}
            </p>

            {isExistingUser && (
              <p className="mt-2 text-sm text-amber-700">
                Routine with this ID already exists. Update it?
              </p>
            )}

            <button
              type="button"
              className="mt-3 h-10 w-full rounded-md bg-neutral-900 text-white disabled:opacity-60"
              onClick={handleSave}
              disabled={saveStatus === "saving" || saveStatus === "saved"}
            >
              {saveStatus === "saving"
                ? "Saving..."
                : isExistingUser
                  ? "Update Routine"
                  : "Save as Friend"}
            </button>

            {saveStatus === "error" && (
              <p className="mt-2 text-sm text-red-600">Could not save routine. Please try again.</p>
            )}
          </div>
        )}

        <button
          type="button"
          className="mt-4 h-10 w-full rounded-md border border-neutral-300 bg-white"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default AddFriendRoutineModal;
