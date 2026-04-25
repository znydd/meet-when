import { getAdmin } from "./dbQuery";
import { encodeSharedPayload, type SharedRoutinePayload } from "./sharedRoutineLink";

export async function shareRoutine() {
  const admins = await getAdmin();
  if (!admins || admins.length === 0) {
    alert("No routine found to share. Please set up your routine first.");
    return;
  }

  const currentAdmin = admins[0];
  const payload: SharedRoutinePayload = {
    v: 1,
    name: currentAdmin.name,
    studentId: currentAdmin.studentId,
    routine: currentAdmin.routine,
  };
  const encodedData = encodeSharedPayload(payload);
  const shareText = `${encodedData}`;

  const shareData = {
    title: `${currentAdmin.name}'s Routine`,
    text: shareText,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      console.log("Routine shared successfully");
    } catch (err) {
      console.error("Share failed:", err);
    }
  } else {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(encodedData);
      alert("Encoded routine copied. Share this code with your friend.");
      return;
    }

    alert("Sharing is not supported on this browser. Copy the encoded routine manually.");
    prompt("Copy this encoded routine:", encodedData);
  }
}
