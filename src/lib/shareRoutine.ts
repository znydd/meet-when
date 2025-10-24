export async function shareRoutine() {
  // 1. Serialize and encode the routine data
  const routineObject = {
    name: "Nabil",
  };
  const jsonString = JSON.stringify(routineObject);
  const encodedData = encodeURIComponent(jsonString);

  // 2. Create the full, shareable link
  const shareUrl = `http://localhost:5173/import#${encodedData}`;

  const shareData = {
    title: "Check out my routine!",
    text: `Here's my "${routineObject}" routine. Click the link to add it!`,
    url: shareUrl,
  };

  // 3. Check if the Web Share API is available
  if (navigator.share) {
    try {
      // 4. Call the native share sheet!
      await navigator.share(shareData);
      console.log("Routine shared successfully");
    } catch (err) {
      console.error("Share failed:", err);
    }
  } else {
    // 5. Fallback for desktop or unsupported browsers
    alert(
      "Sharing is not supported on this browser. You can copy the link manually.",
    );
    prompt("Copy this link to share:", shareUrl);
  }
}
