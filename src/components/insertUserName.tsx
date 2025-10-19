function InsertUserName() {
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
      <div className=" h-64 w-10/12 mt-36 p-4 max-w-[360px]  bg-[#ffffff] border-1 border-neutral-200 rounded-xl font-mono text-sm font-medium">
        <form>
          <div>
            <label htmlFor="username">User Name</label>
            <input
              className="w-full p-2 mt-1 border border-neutral-300 rounded-md shadow-sm"
              type="text"
              id="userName"
              name="username"
              placeholder="Bracu Chicken"
            />
          </div>
          <div className=" mt-2">
            <label htmlFor="studentId">Student ID</label>
            <input
              className="w-full p-2 mt-1 border border-neutral-300 rounded-md shadow-sm"
              type="number"
              id="studentId"
              name="studentid"
              placeholder="22101150"
            />
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

export default InsertUserName;
