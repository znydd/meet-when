type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

const PWA_LIKELY_INSTALLED_KEY = "meetwhen:pwa-likely-installed";

const DISPLAY_MODE_QUERIES = [
  "(display-mode: standalone)",
  "(display-mode: fullscreen)",
  "(display-mode: minimal-ui)",
];

export function isPWAInstalled(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const navigatorWithStandalone = window.navigator as NavigatorWithStandalone;
  const isIOSStandalone = navigatorWithStandalone.standalone === true;
  const hasDisplayMode = typeof window.matchMedia === "function";
  const isDisplayModeInstalled =
    hasDisplayMode &&
    DISPLAY_MODE_QUERIES.some((query) => window.matchMedia(query).matches);
  const isTrustedWebActivity = document.referrer.startsWith("android-app://");

  return isIOSStandalone || isDisplayModeInstalled || isTrustedWebActivity;
}

export function isIOSDevice(): boolean {
  if (typeof navigator === "undefined") {
    return false;
  }

  const userAgent = navigator.userAgent.toLowerCase();
  const isIOSByUA = /iphone|ipad|ipod/.test(userAgent);
  const isIPadOS = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  return isIOSByUA || isIPadOS;
}

export function isAndroidDevice(): boolean {
  if (typeof navigator === "undefined") {
    return false;
  }

  return /android/i.test(navigator.userAgent);
}

export function subscribePWAInstallStatus(onChange: (installed: boolean) => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const refreshInstallStatus = () => {
    onChange(isPWAInstalled());
  };

  const queries = DISPLAY_MODE_QUERIES.map((query) => window.matchMedia(query));

  const addChangeListener = (query: MediaQueryList) => {
    const legacyQuery = query as MediaQueryList & {
      addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
    };
    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", refreshInstallStatus);
    } else if (typeof legacyQuery.addListener === "function") {
      legacyQuery.addListener(refreshInstallStatus);
    }
  };

  const removeChangeListener = (query: MediaQueryList) => {
    const legacyQuery = query as MediaQueryList & {
      removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
    };
    if (typeof query.removeEventListener === "function") {
      query.removeEventListener("change", refreshInstallStatus);
    } else if (typeof legacyQuery.removeListener === "function") {
      legacyQuery.removeListener(refreshInstallStatus);
    }
  };

  window.addEventListener("appinstalled", refreshInstallStatus);
  document.addEventListener("visibilitychange", refreshInstallStatus);
  queries.forEach(addChangeListener);
  refreshInstallStatus();

  return () => {
    window.removeEventListener("appinstalled", refreshInstallStatus);
    document.removeEventListener("visibilitychange", refreshInstallStatus);
    queries.forEach(removeChangeListener);
  };
}

export function isPWALikelyInstalled(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.localStorage.getItem(PWA_LIKELY_INSTALLED_KEY) === "1";
  } catch {
    return false;
  }
}

export function markPWALikelyInstalled(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(PWA_LIKELY_INSTALLED_KEY, "1");
  } catch {
    // Ignore storage errors in private mode or restricted environments.
  }
}
