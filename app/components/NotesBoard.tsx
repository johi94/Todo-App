"use client";

import { useState } from "react";
import { lato } from "../fonts";
import { Trash2 } from "lucide-react";
import NoteStack from "./NoteStack";
import NoteCard from "./NoteCard";
import { noteButtonClassName } from "./noteButtonStyle";
import { useNotes } from "./NotesContext";
import { defaultNoteColor, getRandomNoteColor } from "./noteColors";
import { NOTE_HALF, NOTE_SIZE } from "./noteSize";
import { useNoteDrag } from "../hooks/useNoteDrag";

export default function NotesBoard() {
  const { notes, addNote, updateNote, bringToFront, trashNote, archiveNote } =
    useNotes();
  const [upcomingColors, setUpcomingColors] = useState(() => [
    defaultNoteColor,
    getRandomNoteColor(),
    getRandomNoteColor(),
  ]);

  function updateNoteText(id: string, text: string) {
    updateNote(id, { text });
  }

  function clearNoteText(id: string) {
    updateNoteText(id, "");
  }

  function handleMove(id: string, x: number, y: number) {
    bringToFront(id);
    updateNote(id, { x, y });
  }

  function handleCreate(x: number, y: number) {
    addNote({
      id: crypto.randomUUID(),
      color: upcomingColors[0],
      x,
      y,
      text: "",
    });
    setUpcomingColors((prev) => [...prev.slice(1), getRandomNoteColor()]);
  }

  const {
    draggingId,
    dragPosition,
    isOverTrash,
    isDragging,
    trashRef,
    boardRef,
    startDragExisting,
    startDragNew,
  } = useNoteDrag({
    onMove: handleMove,
    onCreate: handleCreate,
    onTrash: trashNote,
  });

  const draggedColor =
    notes.find((note) => note.id === draggingId)?.color ?? upcomingColors[0];

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
      <div className="absolute bottom-8 right-32 flex items-end gap-12">
        <div
          ref={trashRef}
          className={`flex h-50 w-50 items-center justify-center rounded-md border-2 border-dashed transition-colors duration-200 ${
            isOverTrash
              ? "border-red-500 text-red-500"
              : isDragging
                ? "border-slate-950 text-slate-950"
                : "border-slate-500 text-slate-400"
          }`}
        >
          <Trash2 className="h-20 w-20" />
        </div>
        <NoteStack
          colors={upcomingColors}
          isDragging={isDragging && draggingId === null}
          onGrab={startDragNew}
        />
      </div>

      {notes
        .filter((note) => note.id !== draggingId)
        .map((note) => (
          <NoteCard
            key={note.id}
            color={note.color}
            text={note.text}
            editable
            onGrab={(event) => startDragExisting(event, note.id)}
            onTextChange={(text) => updateNoteText(note.id, text)}
            className="absolute"
            style={{ left: note.x, top: note.y }}
          >
            <button
              type="button"
              onClick={() => clearNoteText(note.id)}
              aria-label="Clear note text"
              className={noteButtonClassName}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => archiveNote(note.id)}
              aria-label="Archive note"
              className={noteButtonClassName}
            >
              Archive
            </button>
          </NoteCard>
        ))}
      {dragPosition && (
        <div
          className={`pointer-events-none fixed rotate-12 rounded-md transition-transform duration-150 ${draggedColor} ${
            isOverTrash ? "scale-50" : "scale-100"
          }`}
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
