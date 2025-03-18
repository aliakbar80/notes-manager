"use client";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import NoteCard from "@/components/ui/noteCard";
import Textarea from "@/components/ui/Textarea";
import { Note, useIndexedDB } from "@/lib/db/indexedDB";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { Plus, SaveIcon, Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const NotesPage: React.FC = () => {
  const { addNote, updateNote, deleteNote, getAllNotes, searchNotes, getNoteById } = useIndexedDB();
  
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearch = useDebounce(searchQuery, 300);

  const fetchNotes = async () => {
    setIsLoading(true);
    const data = await getAllNotes();
    
    if (JSON.stringify(data) !== JSON.stringify(notes)) {
      setNotes(data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (debouncedSearch) {
      handleSearch(debouncedSearch);
    } else if (notes.length === 0) {
      fetchNotes();
    }
  }, [debouncedSearch]);

  const handleSearch = async (query: string) => {
    const results = await searchNotes(query);
    setNotes(results);
  };

  const handleSaveNote = async (note: Partial<Note>) => {
    const noteToSave: Note = {
      id: note.id ?? Date.now(),
      title: note.title || "",
      description: note.description || "",
      content: note.content || "",
      createdAt: note.createdAt ?? new Date(),
      updatedAt: new Date(),
    };

    try {
      const existingNote = await getNoteById(noteToSave.id as number);
      if (existingNote) {
        await updateNote(noteToSave);
      } else {
        await addNote(noteToSave);
      }
      fetchNotes();
      closeModal();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleDeleteNote = async (id: number) => {
    if (confirm("آیا از حذف این یادداشت مطمئن هستید؟")) {
      await deleteNote(id);
      fetchNotes();
    }
  };

  const openModal = (note?: Note) => {
    setCurrentNote(note || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentNote(null);
  };

  return (
    <>
      <div className="mx-auto container pb-20 pt-10 px-6">
        <div className="flex justify-between items-center pb-6 w-full gap-3">
          <Input
            placeholder="جستجو یادداشت‌ها..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            disabled={!notes}
            isLoading={isLoading}
            onClick={() => openModal()}
            className="min-w-max"
            variant="outline"
            icon={<Plus />}
          >
            یادداشت جدید
          </Button>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            <p>در حال بارگذاری...</p>
          ) : (
            notes.map((note) => (
              <NoteCard
                key={note.id}
                onEditClick={() => openModal(note)}
                onDeleteClick={() => handleDeleteNote(note.id as number)}
                title={note.title}
                description={note.description || ""}
                creationDate={note.createdAt.toLocaleString()}
              />
            ))
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentNote ? "ویرایش یادداشت" : "یادداشت جدید"}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);

            handleSaveNote({
              id: currentNote?.id,
              title: formData.get("title") as string,
              description: formData.get("description") as string,
              createdAt: currentNote?.createdAt ?? new Date(),
            });
          }}
          className="grid gap-3 min-w-[450px] w-full"
        >
          <Input placeholder="موضوع یادداشت" name="title" defaultValue={currentNote?.title} required />
          <Textarea placeholder="توضیحات" name="description" defaultValue={currentNote?.description} required />
          <div className="flex gap-2 justify-end">
            <Button onClick={closeModal} variant="outline">
              لغو
            </Button>
            <Button type="submit">
              <SaveIcon />
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default NotesPage;
