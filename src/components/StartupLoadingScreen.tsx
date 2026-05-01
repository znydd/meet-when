function StartupLoadingScreen() {
    return (
        <div className="min-h-dvh bg-[#fafafa] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 rounded-full border-4 border-neutral-300 border-t-neutral-900 animate-spin" />
                <p className="text-sm text-neutral-700 font-medium">Loading your routine...</p>
            </div>
        </div>
    );
}

export default StartupLoadingScreen;
