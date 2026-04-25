import { isDay, isTime, type Day, type EachDay, type User } from "../types/type";

export interface SharedRoutinePayload extends User {
  v: 1;
}

function toBase64Url(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string): string {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "===".slice((base64.length + 3) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function isRoutineValue(value: unknown): value is EachDay {
  if (!value || typeof value !== "object") {
    return false;
  }

  const expectedDays: Day[] = [
    "SATURDAY",
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
  ];

  for (const day of expectedDays) {
    const slots = (value as Record<string, unknown>)[day];
    if (!Array.isArray(slots)) {
      return false;
    }

    for (const slot of slots) {
      if (!Array.isArray(slot) || slot.length !== 2) {
        return false;
      }
      const [course, time] = slot;
      if (typeof course !== "string" || typeof time !== "string" || !isTime(time)) {
        return false;
      }
    }
  }

  return true;
}

export function isValidSharedPayload(payload: unknown): payload is SharedRoutinePayload {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const record = payload as Record<string, unknown>;

  if (record.v !== 1) {
    return false;
  }

  if (typeof record.name !== "string" || typeof record.studentId !== "string") {
    return false;
  }

  if (!isRoutineValue(record.routine)) {
    return false;
  }

  const routineEntries = record.routine as Record<string, unknown>;
  return Object.keys(routineEntries).every((day) => isDay(day));
}

export function encodeSharedPayload(payload: SharedRoutinePayload): string {
  return toBase64Url(JSON.stringify(payload));
}

function extractEncodedValue(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    return "";
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const parsedUrl = new URL(trimmed);
      return parsedUrl.hash.startsWith("#") ? parsedUrl.hash.slice(1) : "";
    } catch {
      return "";
    }
  }

  if (trimmed.includes("#")) {
    const hashPart = trimmed.split("#").pop();
    return hashPart?.trim() ?? "";
  }

  return trimmed;
}

export function decodeSharedPayload(input: string): SharedRoutinePayload | null {
  const value = extractEncodedValue(input);
  if (!value) {
    return null;
  }

  try {
    const decodedJson = fromBase64Url(value);
    const parsed = JSON.parse(decodedJson);
    return isValidSharedPayload(parsed) ? parsed : null;
  } catch (error) {
    console.error("Invalid shared routine payload:", error);
    return null;
  }
}
