import React, { useState } from "react";

function InsertNameId({
  onNameId,
}: {
  onNameId: (name: string, id: string) => void;
}) {
  const [name, setName] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [idError, setIdError] = useState<boolean>(false);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.value.length > 10 || event.target.value.length < 2) {
      setNameError(true);
    } else {
      setNameError(false);
      setName(event.target.value);
    }
  };
  const handleStudentId = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value.replace(/\D/g, "").slice(0, 8);
    setStudentId(value);
    if (value.length === 8) {
      setIdError(false);
    } else {
      setIdError(true);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    onNameId(name, studentId);
  };

  return (
    <>
      <div className="mt-36">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin [animation-duration:1.7s] lucide lucide-asterisk-icon lucide-asterisk"
        >
          <path d="M12 6v12" />
          <path d="M17.196 9 6.804 15" />
          <path d="m6.804 9 10.392 6" />
        </svg>
      </div>
      <div className="h-screen flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="h-64 w-5/6 xs:w-full p-4  max-w-lg min-w-[300px]  bg-[#ffffff] border-1 border-neutral-200 rounded-xl font-mono text-sm font-medium"
        >
          <div>
            <label htmlFor="name">Name</label>
            <input
              className="w-full p-2 mt-1 border border-neutral-300 rounded-md shadow-sm"
              type="text"
              id="name"
              name="name"
              placeholder="Bracu Chicken"
              onChange={handleName}
              required
            />
            {nameError && (
              <div className="text-red-500">Name should be 2-10 Characters</div>
            )}
          </div>
          <div className=" mt-2">
            <label htmlFor="studentId">Student ID</label>
            <input
              className="w-full p-2 mt-1 border border-neutral-300 rounded-md shadow-sm"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={8}
              id="studentId"
              name="studentid"
              placeholder="22101150"
              value={studentId}
              onChange={handleStudentId}
              required
            />
            {idError && (
              <div className="text-red-500">ID should be 8 digits</div>
            )}
          </div>
          <button
            className="flex items-center justify-center w-full h-11 p-2 mt-8 border border-neutral-300 bg-neutral-900 rounded-md shadow-sm"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-send-horizontal-icon lucide-send-horizontal"
            >
              <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
              <path d="M6 12h16" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}

export default InsertNameId;
