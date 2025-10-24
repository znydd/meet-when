import PWABadge from "./PWABadge.tsx";
import HomePage from "./pages/HomePage.tsx";
import ImportRoutine from "./pages/ImportRoutine.tsx";
import InitialUserInput from "./pages/InitialUserInput.tsx";
import ShareRoutine from "./components/ShareRoutine.tsx";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>
      <PWABadge />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/input" element={<InitialUserInput />} />
          <Route path="/import" element={<ImportRoutine />} />
          <Route path="/share" element={<ShareRoutine />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
