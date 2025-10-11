import { openDB, type DBSchema } from "idb";
import { type Person } from "../types/interfaces";

interface RoutineDB extends DBSchema {
  person: {
    key: number;
    value: Person;
    indexes: { by_name: string };
  };
}

const DB_NAME = "MeetWhenDB";

async function getDB() {
  return await openDB<RoutineDB>(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("person")) {
        const peopleStore = db.createObjectStore("person", {
          keyPath: "id",
          autoIncrement: true,
        });
        peopleStore.createIndex("by_name", "name", { unique: true });
      }
    },
  });
}

// --- People Functions ---
export async function addPerson(person: Person): Promise<number> {
  const db = await getDB();
  return db.add("person", person);
}

export async function getPerson(name: string): Promise<Person[]> {
  const db = await getDB();
  const person = await db.getAllFromIndex("person", "by_name", name);
  return person;
}

export async function getAllPeople(): Promise<Person[]> {
  const db = await getDB();
  return db.getAll("person");
}
