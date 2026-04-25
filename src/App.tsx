import PWABadge from "./PWABadge.tsx";
import HomePage from "./pages/HomePage.tsx";
import InitialUserInput from "./pages/InitialUserInput.tsx";
import ImportSharedRoutine from "./pages/ImportSharedRoutine.tsx";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>
      <PWABadge />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/input" element={<InitialUserInput />} />
          <Route path="/import" element={<ImportSharedRoutine />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
