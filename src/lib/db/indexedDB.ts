import { useEffect, useState } from "react";
import Dexie, { Table } from "dexie";

export interface Note {
  id?: number;
  title: string;
  description?: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

class NotesDatabase extends Dexie {
  notes!: Table<Note>;

  constructor() {
    super("NotesDB");
    this.version(1).stores({
      notes: "++id, title, createdAt",
    });
  }
}

const db = new NotesDatabase();

export const useIndexedDB = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initDB = async () => {
      try {
        await db.open();
        setInitialized(true);
      } catch (error) {
        console.error("error in open IndexedDB", error);
      }
    };

    initDB();
  }, []);

  const addNote = async (note: Note) => {
    if (!initialized) return;
    await db.notes.add(note);
  };

  const updateNote = async (note: Note) => {
    if (!initialized) return;
    await db.notes.update(note.id!, note);
  };

  const deleteNote = async (id: number) => {
    if (!initialized) return;
    await db.notes.delete(id);
  };

  const getAllNotes = async (): Promise<Note[]> => {
    if (!initialized) return [];
    return await db.notes.toArray();
  };

  const getNoteById = async (id: number): Promise<Note | undefined> => {
    if (!initialized) return undefined;
    return await db.notes.get(id);
  };

  const searchNotes = async (query: string): Promise<Note[]> => {
    if (!initialized) return [];
    return await db.notes
      .filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase())
      )
      .toArray();
  };

  return { addNote, updateNote, deleteNote, getAllNotes, getNoteById, searchNotes };
};
