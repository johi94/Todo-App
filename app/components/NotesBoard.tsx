"use client";

import { useEffect, useRef, useState } from "react";
import { lato } from "../fonts";
import NoteStack from "./NoteStack";
import StickyNote from "./StickyNote";
import { defaultNoteColor, getRandomNoteColor } from "./noteColors";
import { NOTE_HALF, NOTE_SIZE } from "./noteSize";

type Note = {
  id: string;
  color: string;
  x: number;
  y: number;
  text: string;
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

  const [movingNoteId, setMovingNoteId] = useState<string | null>(null);
  const boardRef = useRef<HTMLElement>(null);

  function handleNoteGrab(event: React.PointerEvent) {
    setDragPosition({ x: event.clientX, y: event.clientY });
  }

  function handleExistingNoteGrab(event: React.PointerEvent, id: string) {
    setMovingNoteId(id);
    setDragPosition({ x: event.clientX, y: event.clientY });
    bringToFront(id);
  }

  function addNoteAt(x: number, y: number) {
    const newNote: Note = {
      id: crypto.randomUUID(),
      color: upcomingColors[0],
      x,
      y,
      text: "",
    };
    setNotes((prev) => [...prev, newNote]);
    setUpcomingColors((prev) => [...prev.slice(1), getRandomNoteColor()]);
  }

  function bringToFront(id: string) {
    setNotes((prev) => {
      const grabbed = prev.find((note) => note.id === id);
      if (!grabbed) return prev;
      return [...prev.filter((note) => note.id !== id), grabbed];
    });
  }

  function updateNoteText(id: string, text: string) {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, text } : note)),
    );
  }

  function clearNoteText(id: string) {
    updateNoteText(id, "");
  }

  function moveNoteTo(id: string, x: number, y: number) {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, x, y } : note)),
    );
  }

  function finishDrag(clientX: number, clientY: number) {
    const bounds = boardRef.current?.getBoundingClientRect();
    if (bounds && isInsideBoard(clientX, clientY, bounds)) {
            const x = clamp(clientX - bounds.left - NOTE_HALF, 0, bounds.width - NOTE_SIZE);
      const y = clamp(clientY - bounds.top - NOTE_HALF, 0, bounds.height - NOTE_SIZE);

      if (movingNoteId) {
        moveNoteTo(movingNoteId, x, y);
      } else {
        addNoteAt(x, y);
      }
    }
    setDragPosition(null);
    setMovingNoteId(null);
  }

  const draggedColor =
    notes.find((note) => note.id === movingNoteId)?.color ?? upcomingColors[0];
  const isDragging = dragPosition !== null;
  const finishDragRef = useRef(finishDrag);
    useEffect(() => {
    document.body.style.cursor = isDragging ? "grabbing" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [isDragging]);


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
          isDragging={isDragging && movingNoteId === null}
          onGrab={handleNoteGrab}
        />
      </div>
      {notes
        .filter((note) => note.id !== movingNoteId)
        .map((note) => (
          <StickyNote
            key={note.id}
            id={note.id}
            color={note.color}
            x={note.x}
            y={note.y}
            text={note.text}
            onGrab={handleExistingNoteGrab}
            onSave={updateNoteText}
            onClear={clearNoteText}
          />
        ))}
                  {dragPosition && (
        <div
          className={`pointer-events-none fixed rotate-12 rounded-md ${draggedColor}`}
          style={{
            left: dragPosition.x - NOTE_HALF,
            top: dragPosition.y - NOTE_HALF,
            height: NOTE_SIZE,
            width: NOTE_SIZE,
          }}
        />
      )}
    </main>
  );
}

