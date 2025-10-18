import { parseHtml } from "../lib/parseHtml";

function PasteAsHtml() {
  // Function to handle the paste event
  const handlePaste = async (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const htmlString: string = event.clipboardData.getData("text/html");
    const parsedHtml = await parseHtml(htmlString);
    console.log(parsedHtml);
  };
  return (
    <>
      {/* 1. Parent container to position the layers */}
      <div className="relative flex items-center justify-center max-w-sm [300px]:w-full w-10/12 mx-2 h-[300px] min-h-[150px]">
        {/* 2. Visual Layer (Bottom) - Just for looks */}
        <div className="absolute inset-0 flex items-center justify-center border-1 border-solid border-neutral-200 shadow-sm shadow-neutral-200 bg-[#ffffff] rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="70"
            height="70"
            viewBox="0 0 512 512"
            enableBackground="new 0 0 512 512"
            xmlSpace="preserve"
          >
            <g>
              <path
                d="M383.2 253.7c-7.1 0-13.7 2.1-19.3 5.8v-4c0-19.5-15.8-35.3-35.3-35.3-7.1 0-13.7 2.1-19.3 5.8v-15.4c0-19.5-15.8-35.3-35.3-35.3-7.1 0-13.7 2.1-19.3 5.8v-73.6c0-19.5-15.9-35.3-35.3-35.3-19.5 0-35.3 15.9-35.3 35.3v183.1l-3.2-3.4c-17.4-18.7-52.3-38.7-69.5-28.8-9.8 5.6-17.1 17.5-17.8 29-.6 10.6 4.2 20.2 13.6 27.1 4.1 2.9 7.6 5.3 10.8 7.3 11.5 7.5 17.2 11.2 25.8 31.9 2.9 7 4.9 13.1 6.9 19 6 18.1 10.8 32.4 33.3 49.2 20.2 15.2 27.3 26.2 29.2 29.6V504c0 4.4 3.6 8 8 8h138.2c4.4 0 8-3.6 8-8 0-14-.4-24.1-.6-31.5-.8-21.2-.8-21.2 12.6-43.5 2.9-4.9 6.5-10.9 10.8-18.3 18.8-32.3 28.4-73.2 28.4-121.8-.1-19.4-16-35.2-35.4-35.2zm-6.9 149c-4.2 7.3-7.8 13.3-10.7 18.1-15.4 25.6-15.8 27.1-14.9 52.3.2 5.8.5 13.2.6 22.9H229.1v-46.6c0-1-.2-1.9-.5-2.8-.6-1.6-6.8-16.5-35.1-37.7-18.5-13.9-21.9-24.3-27.7-41.5-2-5.9-4.2-12.5-7.3-20-10.4-25.3-19.4-31.2-31.9-39.2-3.1-2-6.4-4.2-10.1-6.8-4.9-3.6-7.3-8.1-7-13.2.4-7 5.3-13.5 9.7-16 2-1.2 9.2-.9 20.5 4.5 10.7 5.1 21.7 13.1 29.4 21.3l17.1 18.3c2.2 2.4 5.7 3.2 8.8 2s5.1-4.2 5.1-7.5V107.3c0-10.7 8.7-19.3 19.3-19.3 10.7 0 19.3 8.7 19.3 19.3v202.2c0 4.4 3.6 8 8 8s8-3.6 8-8v-99c0-10.6 8.7-19.3 19.3-19.3s19.3 8.7 19.3 19.3v99c0 4.4 3.6 8 8 8s8-3.6 8-8v-54c0-10.6 8.7-19.3 19.3-19.3s19.3 8.7 19.3 19.3v54c0 4.4 3.6 8 8 8s8-3.6 8-8V289c0-10.7 8.7-19.3 19.3-19.3s19.3 8.7 19.3 19.3c0 45.7-8.9 83.9-26.2 113.7zM262.4 144.6c9-10.3 13.9-23.5 13.9-37.3 0-31.4-25.6-57-57-57s-57 25.6-57 57c0 13.7 4.9 26.9 13.9 37.3 2.9 3.3 2.5 8.4-.8 11.3-1.5 1.3-3.4 2-5.2 2-2.2 0-4.5-.9-6.1-2.8-11.5-13.2-17.8-30.2-17.8-47.8 0-40.2 32.7-73 73-73s73 32.7 73 73c0 17.6-6.3 34.5-17.8 47.8-2.9 3.3-8 3.7-11.3.8s-3.7-8-.8-11.3zm-150.3-37.3C112.1 48.1 160.2 0 219.4 0s107.3 48.1 107.3 107.3c0 23.7-7.6 46.2-21.9 65-2.7 3.5-7.7 4.2-11.2 1.5s-4.2-7.7-1.5-11.2c12.2-16 18.7-35.1 18.7-55.3 0-50.3-41-91.3-91.3-91.3s-91.3 41-91.3 91.3c0 32.5 17.5 62.9 45.8 79.1 3.8 2.2 5.1 7.1 2.9 10.9-1.5 2.6-4.2 4-6.9 4-1.4 0-2.7-.3-4-1.1-33.3-19-53.9-54.7-53.9-92.9z"
                fill="#000000"
                opacity="0.6"
                data-original="#000000"
              ></path>
            </g>
          </svg>
        </div>

        {/* 3. Functional Layer (Top) - Handles the paste */}
        <div
          onPaste={handlePaste}
          contentEditable={true}
          suppressContentEditableWarning={true}
          className="absolute inset-0 cursor-pointer text-transparent caret-transparent focus:outline-none"
        />
      </div>
    </>
  );
}
export default PasteAsHtml;
