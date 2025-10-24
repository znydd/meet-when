import { TbHome } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiShareFatBold } from "react-icons/pi";
import { useState } from "react";
import { shareRoutine } from "../lib/shareRoutine";

function FloatingNavBar() {
  const [isClicked, setIsClicked] = useState<"home" | "delete" | "share">(
    "home",
  );
  return (
    // Main container: fixed, bottom-centered, and on top (z-50)
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-x-6 bg-white rounded-full shadow-lg p-1">
        <div
          className={
            isClicked === "delete"
              ? "bg-neutral-800 p-3 rounded-full text-white"
              : "p-3"
          }
          onClick={() => setIsClicked("delete")}
        >
          <RiDeleteBin6Line size={24} />
        </div>
        <div
          className={
            isClicked === "home"
              ? "bg-neutral-800 p-3 rounded-full text-white"
              : "p-3"
          }
          onClick={() => setIsClicked("home")}
        >
          <TbHome size={24} />
        </div>
        <div
          className={
            isClicked === "share"
              ? "bg-neutral-800 p-3 rounded-full text-white"
              : "p-3"
          }
          onClick={() => {
            setIsClicked("share");
            shareRoutine();
          }}
        >
          <PiShareFatBold size={24} />
        </div>
      </div>
    </div>
  );
}

export default FloatingNavBar;
