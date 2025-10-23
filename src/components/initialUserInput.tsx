import Instruction from "./instruction";
import PasteAsHtml from "./pasteAsHtml";
import InsertNameId from "./insertNameId";
import type { User, EachDay, Status } from "../types/type";
import { createAdmin } from "../lib/dbQuery";
import { useState } from "react";

function InitialUserInput({
  onInputDone,
}: {
  onInputDone: (inputDone: boolean) => void;
}) {
  const [routine, setRoutine] = useState<EachDay | null>(null);
  const [parsingStatus, setParsingStatus] = useState<Status>("idle");
  const [statusModal, setStatusModal] = useState<"show" | "hide">("hide");
  const handleRoutine = (
    parsedStatus: Status,
    parsedRoutine: EachDay | null,
  ) => {
    if (parsedStatus === "success" && parsedRoutine) {
      setRoutine(parsedRoutine);
    }
    setParsingStatus(parsedStatus);
    console.log(routine);
  };

  const handleNameId = async (name: string, id: string) => {
    console.log(name, id);
    if (routine && name && id) {
      const newUser: User = {
        name: name,
        studentId: id,
        routine: routine,
      };
      const studentId: string = await createAdmin(newUser);
      if (studentId) {
        setStatusModal("show");
        setTimeout(() => {
          setStatusModal("hide");
          onInputDone(true);
        }, 1000);
      }
      console.log(newUser);
    }
  };

  return (
    <>
      {statusModal === "show" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm text-black">
          <div className="text-center border showdow-sm bg-white px-14 py-10 rounded-lg">
            Done
          </div>
        </div>
      )}

      {parsingStatus === "success" ? (
        <div className="h-screen flex flex-col items-center bg-[#fafafa]">
          <InsertNameId onNameId={handleNameId} />
        </div>
      ) : (
        <div className="h-screen flex flex-col items-center bg-[#fafafa]">
          <Instruction />
          <PasteAsHtml onParseRoutine={handleRoutine} />
        </div>
      )}
    </>
  );
}

export default InitialUserInput;
