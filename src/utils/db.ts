import { openDB, type DBSchema } from 'idb';
import { type Person } from './interfaces'

interface RoutineDB extends DBSchema {
    person: {
        key: number;
        value: Person;
        indexes: { by_name: string };
    };
}

const DB_NAME = 'MeetWhenDB';

async function getDB() {
    return await openDB<RoutineDB>(DB_NAME, 1, {
        upgrade(db) {

            if (!db.objectStoreNames.contains('person')) {
                const peopleStore = db.createObjectStore('person', {
                    keyPath: 'id',
                    autoIncrement: true,
                });
                peopleStore.createIndex('by_name', 'name', { unique: true });
            }
        },
    });
}

// --- People Functions ---
export async function addPerson(person: Person): Promise<number> {
    const db = await getDB();
    return db.add('person', person);
}

export async function getAllPeople(): Promise<Person[]> {
    const db = await getDB();
    return db.getAll('person');
}

