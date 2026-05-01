import { useMemo } from "react";
import { isAndroidDevice, isIOSDevice } from "../lib/pwaInstallStatus";

function InstallRequiredScreen() {
  const isIOS = useMemo(() => isIOSDevice(), []);
  const isAndroid = useMemo(() => isAndroidDevice(), []);

  return (
    <div className="min-h-dvh bg-[#fafafa] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-center">Install Meet-When</h1>
        <p className="mt-2 text-center text-sm text-neutral-600">
          This app works only as installed PWA. Install first, then open from your home screen.
        </p>

        {isAndroid && (
          <div className="mt-5 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-700">
            <p className="font-semibold mb-1">Android Install</p>
            <p>Open browser menu and tap "Install app" or "Add to Home screen".</p>
            <p className="mt-1">After installing, launch Meet-When from the home screen icon.</p>
          </div>
        )}

        {isIOS && (
          <div className="mt-5 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-700">
            <p className="font-semibold mb-1">iPhone Install</p>
            <p>Open in Safari, tap the Share icon, then tap "Add to Home Screen".</p>
            <p className="mt-1">After installing, launch Meet-When from the home screen icon.</p>
          </div>
        )}

        {!isIOS && !isAndroid && (
          <div className="mt-5 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-700">
            <p>Use your browser menu to install this app, then open it from the installed icon.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InstallRequiredScreen;
