"use client";

import { createContext, useContext, useState } from "react";

export type Note = {
  id: string;
  color: string;
  x: number;
  y: number;
  text: string;
};

type NotesContextValue = {
  notes: Note[];
  trashedNotes: Note[];
  archivedNotes: Note[];
  addNote: (note: Note) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  updateTrashedNote: (id: string, updates: Partial<Note>) => void;
  updateArchivedNote: (id: string, updates: Partial<Note>) => void;
  bringToFront: (id: string) => void;
  trashNote: (id: string) => void;
  restoreNote: (id: string) => void;
  archiveNote: (id: string) => void;
  deleteNotePermanently: (id: string) => void;
};

const NotesContext = createContext<NotesContextValue | null>(null);

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [trashedNotes, setTrashedNotes] = useState<Note[]>([]);
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);

  function addNote(note: Note) {
    setNotes((prev) => [...prev, note]);
  }

  function updateNote(id: string, updates: Partial<Note>) {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...updates } : note)),
    );
  }

  function bringToFront(id: string) {
    setNotes((prev) => {
      const grabbed = prev.find((note) => note.id === id);
      if (!grabbed) return prev;
      return [...prev.filter((note) => note.id !== id), grabbed];
    });
  }

  function trashNote(id: string) {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setTrashedNotes((prev) => [...prev, note]);
  }

  function restoreNote(id: string) {
    const note =
      trashedNotes.find((n) => n.id === id) ??
      archivedNotes.find((n) => n.id === id);
    if (!note) return;
    setTrashedNotes((prev) => prev.filter((n) => n.id !== id));
    setArchivedNotes((prev) => prev.filter((n) => n.id !== id));
    setNotes((prev) => [...prev, note]);
  }

  function archiveNote(id: string) {
    const note =
      notes.find((n) => n.id === id) ?? trashedNotes.find((n) => n.id === id);
    if (!note) return;
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setTrashedNotes((prev) => prev.filter((n) => n.id !== id));
    setArchivedNotes((prev) => [...prev, note]);
  }

  function deleteNotePermanently(id: string) {
    setTrashedNotes((prev) => prev.filter((n) => n.id !== id));
    setArchivedNotes((prev) => prev.filter((n) => n.id !== id));
  }

  function updateNoteInList(
    setList: React.Dispatch<React.SetStateAction<Note[]>>,
    id: string,
    updates: Partial<Note>,
  ) {
    setList((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...updates } : note)),
    );
  }

  function updateTrashedNote(id: string, updates: Partial<Note>) {
    updateNoteInList(setTrashedNotes, id, updates);
  }

  function updateArchivedNote(id: string, updates: Partial<Note>) {
    updateNoteInList(setArchivedNotes, id, updates);
  }

  const value = {
    notes,
    trashedNotes,
    archivedNotes,
    addNote,
    updateNote,
    updateTrashedNote,
    updateArchivedNote,
    bringToFront,
    trashNote,
    restoreNote,
    archiveNote,
    deleteNotePermanently,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}
