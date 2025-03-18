import { openDB, IDBPDatabase } from 'idb';
import { useEffect, useState } from 'react';

interface Note {
  description: string;
  id?: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const DB_NAME = 'notesDB';
const STORE_NAME = 'notes';

export const useIndexedDB = () => {
  const [db, setDb] = useState<IDBPDatabase | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await openDB(DB_NAME, 1, {
          upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
              const store = db.createObjectStore(STORE_NAME, {
                keyPath: 'id',
                autoIncrement: true,
              });
              store.createIndex('title', 'title', { unique: false });
              store.createIndex('updatedAt', 'updatedAt', { unique: false });
            }
          },
        });
        setDb(database);
      } catch (err) {
        setError('Failed to initialize database');
        console.error(err);
      }
    };

    initDB();

    return () => {
      db?.close();
    };
  }, []);

  const addNote = async (note: Omit<Note, 'id'>) => {
    if (!db) return null;
    try {
      const id = await db.add(STORE_NAME, note);
      return id;
    } catch (err) {
      setError('Failed to add note');
      console.error(err);
      return null;
    }
  };

  const updateNote = async (note: Note) => {
    if (!db) return false;
    try {
      await db.put(STORE_NAME, note);
      return true;
    } catch (err) {
      setError('Failed to update note');
      console.error(err);
      return false;
    }
  };

  const deleteNote = async (id: number) => {
    if (!db) return false;
    try {
      await db.delete(STORE_NAME, id);
      return true;
    } catch (err) {
      setError('Failed to delete note');
      console.error(err);
      return false;
    }
  };

  const getAllNotes = async () => {
    if (!db) return [];
    try {
      return await db.getAll(STORE_NAME);
    } catch (err) {
      setError('Failed to fetch notes');
      console.error(err);
      return [];
    }
  };

  const getNoteById = async (id: number) => {
    if (!db) return null; 
    try {
      const tx = db.transaction("notes", "readonly");
      const store = tx.objectStore("notes");
      const note = await store.get(id);
      return note ?? null;
    } catch (err) {
      console.error("Error fetching note:", err);
      return null;
    }
  };

  const searchNotes = async (query: string) => {
    if (!db) return [];
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const notes = await store.getAll();
      return notes.filter(note => 
        note.title.toLowerCase().includes(query.toLowerCase())
      );
    } catch (err) {
      setError('Failed to search notes');
      console.error(err);
      return [];
    }
  };

  return {
    addNote,
    updateNote,
    deleteNote,
    getAllNotes,
    searchNotes,
    error,
    getNoteById
  };
};

export type { Note };