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

function isInsideBoard(x: number, y: number, bounds: DOMRect) {
  return (
    x >= bounds.left &&
    x <= bounds.right &&
    y >= bounds.top &&
    y <= bounds.bottom
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

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
    if (bounds && isInsideBoard(clientX, clientY, bounds)) {
      const x = clamp(clientX - bounds.left - 80, 0, bounds.width - 160);
      const y = clamp(clientY - bounds.top - 80, 0, bounds.height - 160);
      addNoteAt(x, y);
    }
    setDragPosition(null);
  }

  const isDragging = dragPosition !== null;
  const finishDragRef = useRef(finishDrag);

  useEffect(() => {
    finishDragRef.current = finishDrag;
  });

  useEffect(() => {
    if (!isDragging) return;
    function handleMove(event: PointerEvent) {
      setDragPosition({ x: event.clientX, y: event.clientY });
    }
    function handleUp(event: PointerEvent) {
      finishDragRef.current(event.clientX, event.clientY);
    }
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [isDragging]);

  return (
    <main
      ref={boardRef}
      className={`relative flex flex-1 flex-col items-center border-2 border-dashed font-sans transition-colors duration-200 ${
        isDragging
          ? "border-sky-400 bg-slate-600"
          : "border-transparent bg-background"
      }`}
    >
      <h1
        className={`${lato.className} text-3xl font-semibold text-foreground`}
      >
        My ToDos:
      </h1>
      <div className="absolute bottom-8 right-32">
        <NoteStack
          colors={upcomingColors}
          isDragging={isDragging}
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
