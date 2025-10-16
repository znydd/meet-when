import PWABadge from "./PWABadge.tsx";
import Instruction from "./components/instruction.tsx";
import PasteAsHtml from "./components/pasteAsHtml.tsx";

function App() {
  return (
    <>
      <div className="h-screen flex flex-col items-center bg-[#fafafa]">
        <Instruction />
        <PasteAsHtml />
        <PWABadge />
      </div>
    </>
  );
}

export default App;
