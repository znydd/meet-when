import { openDB, IDBPDatabase } from "idb";


const DB_NAME = "meetWhenDB";
const STORE_NAME = "meetWhenStore";

export const initDB = async (): Promise<IDBPDatabase | null> => {
    const dbExist = await isDBExist();
    if(!dbExist){
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
}
return openDB(DB_NAME, 1);
};

// check if is DB already exist, then does not initialize again 
export const isDBExist = async () => {
    return new Promise<boolean>((resolve) => {
        const req = indexedDB.open(DB_NAME);
        req.onsuccess = () => {
            req.result.close();
            resolve(true);
        };
        req.onerror = () => resolve(false);
        req.onupgradeneeded = () => resolve(false);
    });
};


export const saveRoutine = async () => {
  try {
    const routineResp = await fetch("./routine.json");
    const routines = await routineResp.json();

    const db = await initDB();
    if(!db){
        return new Error("DB creation failed!")
    }
    const tx = db.transaction(STORE_NAME, "readwrite"); 
    const store = tx.objectStore(STORE_NAME);
    
    for (const routine of routines) {
      await store.put(routine);
    }

    return routines;    
  } catch (error) {
    console.error("Error fetching JSON", error);
  }
};
saveRoutine(); // Runs when the app starts -> initialize indexDB store -> load the routine.json to indexDB


// Return routine according to id(couse code + section)
export const getRoutineById = async () => {
  const db = await initDB();
  return db ? db.get(STORE_NAME, "CSE423-10") : null;
};