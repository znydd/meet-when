import Dexie, { type EntityTable } from "dexie";
import { type User } from "../types/type";

const db = new Dexie("meetWhenDB") as Dexie & {
  users: EntityTable<
    User, // The type of object to store (from types.ts)
    "userName" // The primary key property ('userName' from the User interface)
  >;
};

db.version(1).stores({
  users: "userName",
});

export { db };
