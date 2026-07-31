"use client";

import { useEffect, useRef, useState } from "react";
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
  const [dragPosition, setDragPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const boardRef = useRef<HTMLElement>(null);

  function handleNoteGrab(event: React.PointerEvent) {
    setDragPosition({ x: event.clientX, y: event.clientY });
  }

  function addNoteAt(x: number, y: number) {
    const newNote: Note = {
      id: crypto.randomUUID(),
      color: upcomingColors[0],
      x,
      y,
    };
    setNotes((prev) => [...prev, newNote]);
    setUpcomingColors((prev) => [...prev.slice(1), getRandomNoteColor()]);
  }

  function finishDrag(clientX: number, clientY: number) {
    const bounds = boardRef.current?.getBoundingClientRect();
    if (bounds) {
      addNoteAt(clientX - bounds.left - 80, clientY - bounds.top - 80);
    }
    setDragPosition(null);
  }

  useEffect(() => {
    if (!dragPosition) return;
    function handleMove(event: PointerEvent) {
      setDragPosition({ x: event.clientX, y: event.clientY });
    }
    function handleUp(event: PointerEvent) {
      finishDrag(event.clientX, event.clientY);
    }
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [dragPosition !== null]);

  return (
    <main
      ref={boardRef}
      className="relative flex flex-1 flex-col items-center bg-background font-sans"
    >
      <h1
        className={`${lato.className} text-3xl font-semibold text-foreground`}
      >
        My ToDos:
      </h1>
      <div className="absolute bottom-8 right-32">
        <NoteStack
          colors={upcomingColors}
          isDragging={dragPosition !== null}
          onGrab={handleNoteGrab}
        />
      </div>
      {notes.map((note) => (
        <div
          key={note.id}
          className={`absolute h-40 w-40 rounded-md ${note.color} shadow-md`}
          style={{ left: note.x, top: note.y }}
        />
      ))}
      {dragPosition && (
        <div
          className={`pointer-events-none fixed h-36 w-36 rotate-12 rounded-md ${upcomingColors[0]}`}
          style={{ left: dragPosition.x - 72, top: dragPosition.y - 72 }}
        />
      )}
    </main>
  );
}
