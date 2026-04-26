import { useEffect, useMemo, useState } from "react";
import {
  isAndroidDevice,
  isIOSDevice,
  isPWALikelyInstalled,
  markPWALikelyInstalled,
} from "../lib/pwaInstallStatus";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

function InstallRequiredScreen() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [statusText, setStatusText] = useState<string>("");
  const [likelyInstalled, setLikelyInstalled] = useState<boolean>(() => isPWALikelyInstalled());

  const isIOS = useMemo(() => isIOSDevice(), []);
  const isAndroid = useMemo(() => isAndroidDevice(), []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };
    const handleAppInstalled = () => {
      markPWALikelyInstalled();
      setLikelyInstalled(true);
      setStatusText("Installed. Please use the app from your home screen.");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installEvent) {
      if (isIOS) {
        setStatusText('Use Safari Share -> "Add to Home Screen", then open from icon.');
      } else if (isAndroid) {
        setStatusText('Open browser menu and tap "Install app", then open from icon.');
      } else {
        setStatusText("Use browser menu to install this app, then open the installed app.");
      }
      return;
    }

    setStatusText("");
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    setInstallEvent(null);

    if (choice.outcome === "accepted") {
      markPWALikelyInstalled();
      setLikelyInstalled(true);
      setStatusText("Install accepted. Please use the app from your home screen.");
    } else {
      setStatusText("Install was dismissed. Please install to use this app.");
    }
  };

  return (
    <div className="min-h-dvh bg-[#fafafa] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-center">Install Meet-When</h1>
        <p className="mt-2 text-center text-sm text-neutral-600">
          This app works only as installed PWA. Install first, then open from your home screen.
        </p>
        <p className="mt-3 text-center text-xs font-semibold text-amber-700">
          Status: Browser mode (PWA not active here)
        </p>
        <p className="mt-1 text-center text-xs text-neutral-600">
          Already installed? Open it from your home screen.
        </p>

        <button
          type="button"
          className="mt-5 h-11 w-full rounded-md bg-neutral-900 text-white font-semibold"
          onClick={() => {
            void handleInstall();
          }}
        >
          Install App
        </button>

        {!installEvent && isAndroid && (
          <div className="mt-5 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-700">
            <p className="font-semibold mb-1">Android Install</p>
            <p>If install popup does not appear, open browser menu and tap "Install app".</p>
          </div>
        )}

        {isIOS && (
          <div className="mt-5 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-700">
            <p className="font-semibold mb-1">iPhone Install</p>
            <p>Tap Share icon in Safari, then tap "Add to Home Screen", then open from the icon.</p>
          </div>
        )}

        {!isIOS && !isAndroid && !installEvent && (
          <div className="mt-5 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-700">
            <p>Use your browser menu to install this app, then open the installed app.</p>
          </div>
        )}

        {likelyInstalled && (
          <p className="mt-4 rounded-md border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-700">
            This device likely already installed the PWA. Use the app icon from home screen.
          </p>
        )}

        {statusText && <p className="mt-4 text-sm text-amber-700">{statusText}</p>}
      </div>
    </div>
  );
}

export default InstallRequiredScreen;
