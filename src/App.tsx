import { useEffect, useState } from "react";
import PWABadge from "./PWABadge.tsx";
import HomePage from "./pages/HomePage.tsx";
import InitialUserInput from "./pages/InitialUserInput.tsx";
import ImportSharedRoutine from "./pages/ImportSharedRoutine.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import InstallRequiredScreen from "./components/InstallRequiredScreen.tsx";
import {
  isPWAInstalled,
  markPWALikelyInstalled,
  subscribePWAInstallStatus,
} from "./lib/pwaInstallStatus";

function App() {
  const [installed, setInstalled] = useState<boolean>(() => isPWAInstalled());

  useEffect(() => {
    return subscribePWAInstallStatus(setInstalled);
  }, []);

  useEffect(() => {
    if (installed) {
      markPWALikelyInstalled();
    }
  }, [installed]);

  return (
    <>
      <PWABadge />
      {!installed && <InstallRequiredScreen />}
      {installed && (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/input" element={<InitialUserInput />} />
          <Route path="/import" element={<ImportSharedRoutine />} />
        </Routes>
      </BrowserRouter>
      )}
    </>
  );
}

export default App;
