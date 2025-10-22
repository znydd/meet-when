import { db } from "./db";
import type { User } from "../types/type";

export class UserQueryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserQueryError";
  }
}

// --- CREATE ---
/**
 * Creates a new, unique user in the database.
 * @param user The complete User object to add.
 * @returns The userName of the newly created user.
 * @throws {UserQueryError} If the user object is invalid or the user already exists.
 */
export async function createUser(user: User): Promise<string> {
  if (!user || !user.studentId) {
    throw new UserQueryError("User object is invalid or missing a userName.");
  }

  try {
    await db.users.add(user);

    return user.studentId;
  } catch (error) {
    if (error instanceof Error && error.name === "ConstraintError") {
      // Re-throw a more specific, user-friendly error for the component to catch
      throw new UserQueryError(
        `A user with the Student ID '${user.studentId}' already exists.`,
      );
    } else {
      console.error("Unexpected database error in createUser:", error);
      throw new UserQueryError(
        "An unexpected error occurred while creating the user.",
      );
    }
  }
}

// --- READ ---
/**
 * Fetches a single user by their unique userName.
 * @param userName The unique name of the user to find.
 * @returns The User object if found, or undefined if not.
 */
export async function getUser(studentId: string): Promise<User | undefined> {
  if (!studentId) {
    console.warn("getUser was called with no userName.");
    return undefined;
  }

  try {
    return await db.users.get(studentId);
  } catch (error) {
    console.error("Unexpected database error in getUser:", error);
    return undefined;
  }
}
