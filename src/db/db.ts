import Dexie, { EntityTable } from 'dexie';
import { Task } from '../models/task';

export const db = new Dexie('tododb') as Dexie & {
    tasks: EntityTable<Task, 'id'>
};
db.version(1).stores({
    tasks: '++id, text, completed'
});