import Instruction from "./instruction";
import PasteAsHtml from "./pasteAsHtml";
import InsertNameId from "./insertNameId";
import type { User, EachDay, Status } from "../types/type";
import { useState } from "react";

function InitialUserInput() {
  const [user, setUser] = useState<User>();
  const [routine, setRoutine] = useState<EachDay | null>(null);
  const [parsingStatus, setParsingStatus] = useState<Status>("idle");
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

  const handleNameId = (name: string, id: string) => {
    console.log(name, id);
    if (routine && name && id) {
      const newUser: User = {
        name: name,
        studentId: id,
        routine: routine,
      };
      setUser(newUser);
      console.log(newUser);
    }
  };

  return (
    <>
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
