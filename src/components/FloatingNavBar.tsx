import { TbHome } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiShareFatBold } from "react-icons/pi";
import { IoAdd } from "react-icons/io5";
import { useState } from "react";
import { shareRoutine } from "../lib/shareRoutine";
import AddFriendRoutineModal from "./AddFriendRoutineModal";

function FloatingNavBar() {
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);

  return (
    <>
      {isAddOpen && <AddFriendRoutineModal onClose={() => setIsAddOpen(false)} />}

      {/* Main container: fixed, bottom-centered, and on top (z-50) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-x-4 bg-white rounded-full shadow-lg p-1">
          <button
            type="button"
            className="p-3 rounded-full transition-colors active:bg-neutral-800 active:text-white"
            onClick={() => setIsAddOpen(true)}
            aria-label="Add"
          >
            <IoAdd size={24} />
          </button>
          <button
            type="button"
            className="p-3 rounded-full transition-colors active:bg-neutral-800 active:text-white"
            aria-label="Delete"
          >
            <RiDeleteBin6Line size={24} />
          </button>
          <button
            type="button"
            className="p-3 rounded-full transition-colors active:bg-neutral-800 active:text-white"
            aria-label="Home"
          >
            <TbHome size={24} />
          </button>
          <button
            type="button"
            className="p-3 rounded-full transition-colors active:bg-neutral-800 active:text-white"
            onClick={shareRoutine}
            aria-label="Share"
          >
            <PiShareFatBold size={24} />
          </button>
        </div>
      </div>
    </>
  );
}

export default FloatingNavBar;
