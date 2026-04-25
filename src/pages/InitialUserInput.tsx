import Instruction from "../components/instruction";
import PasteAsHtml from "../components/pasteAsHtml";
import InsertNameId from "../components/insertNameId";
import type { User, EachDay, Status } from "../types/type";
import { createAdmin } from "../lib/dbQuery";
import { useState } from "react";
import { useNavigate } from "react-router";
import { FaCircleCheck } from "react-icons/fa6";

function InitialUserInput() {
  const navigate = useNavigate();
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
          navigate("/");
        }, 1000);
      }
      console.log(newUser);
    }
  };

  return (
    <>
      {statusModal === "show" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm text-black">
          <div className="flex flex-col items-center justify-center  border shadow-sm bg-white px-14 py-10 rounded-lg">
            <FaCircleCheck className="text-green-500 text-4xl " />
            <p className="text-lg font-semibold">Done</p>
          </div>
        </div>
      )}

      {parsingStatus === "success" ? (
        <div className="min-h-dvh flex flex-col items-center bg-[#fafafa]">
          <InsertNameId onNameId={handleNameId} />
        </div>
      ) : (
        <div className="h-dvh max-h-dvh overflow-hidden overscroll-none flex flex-col items-center bg-[#fafafa]">
          <Instruction />
          <PasteAsHtml onParseRoutine={handleRoutine} />
        </div>
      )}
    </>
  );
}

export default InitialUserInput;
