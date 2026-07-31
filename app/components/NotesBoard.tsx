"use client";

import { useState } from "react";
import { lato } from "../fonts";
import NoteStack from "./NoteStack";
import { defaultNoteColor, getRandomNoteColor } from "./noteColors";

type Note = {
  id: string;
  color: string;
  x: number;
  y: number;
};

export default function NotesBoard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [upcomingColors, setUpcomingColors] = useState(() => [
    defaultNoteColor,
    getRandomNoteColor(),
    getRandomNoteColor(),
  ]);

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const bounds = event.currentTarget.getBoundingClientRect();
    const newNote: Note = {
      id: crypto.randomUUID(),
      color: upcomingColors[0],
      x: event.clientX - bounds.left - 48,
      y: event.clientY - bounds.top - 48,
    };
    setNotes((prev) => [...prev, newNote]);
    setUpcomingColors((prev) => [...prev.slice(1), getRandomNoteColor()]);
  }

  return (
    <main
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative flex flex-1 flex-col items-center bg-background font-sans"
    >
      <h1
        className={`${lato.className} text-3xl font-semibold text-foreground`}
      >
        My ToDos:
      </h1>
      <div className="absolute bottom-8 right-32">
        <NoteStack colors={upcomingColors} />
      </div>
      {notes.map((note) => (
        <div
          key={note.id}
          className={`absolute h-40 w-40 rounded-md ${note.color} shadow-md`}
          style={{ left: note.x, top: note.y }}
        />
      ))}
    </main>
  );
}
