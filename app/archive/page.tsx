"use client";

import { Trash2 } from "lucide-react";
import { lato } from "../fonts";
import { useNotes } from "../components/NotesContext";
import { noteButtonClassName } from "../components/noteButtonStyle";
import { useNoteDrag } from "../hooks/useNoteDrag";
import NoteCard from "../components/NoteCard";
import { NOTE_HALF, NOTE_SIZE } from "../components/noteSize";

export default function ArchivePage() {
  const { archivedNotes, restoreNote, deleteNotePermanently, updateArchivedNote } =
    useNotes();

  function handleMove(id: string, x: number, y: number) {
    updateArchivedNote(id, { x, y });
  }

  const {
    draggingId,
    dragPosition,
    isOverTrash,
    isDragging,
    trashRef,
    boardRef,
    startDragExisting,
  } = useNoteDrag({ onMove: handleMove, onTrash: deleteNotePermanently });

  const draggedColor = archivedNotes.find(
    (note) => note.id === draggingId,
  )?.color;

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
        Archive
      </h1>
      <div
        ref={trashRef}
        className={`absolute bottom-8 right-32 flex h-50 w-50 items-center justify-center rounded-md border-2 border-dashed transition-colors duration-200 ${
          isOverTrash
            ? "border-red-500 text-red-500"
            : isDragging
              ? "border-slate-950 text-slate-950"
              : "border-slate-500 text-slate-400"
        }`}
      >
        <Trash2 className="h-20 w-20" />
      </div>
      {archivedNotes.length === 0 && (
        <p className="text-foreground/60">No notes here yet.</p>
      )}
      {archivedNotes
        .filter((note) => note.id !== draggingId)
        .map((note) => (
          <NoteCard
            key={note.id}
            color={note.color}
            text={note.text}
            onGrab={(event) => startDragExisting(event, note.id)}
            className="absolute"
            style={{ left: note.x, top: note.y }}
          >
            <button
              type="button"
              onClick={() => restoreNote(note.id)}
              aria-label="Restore note to dashboard"
              className={noteButtonClassName}
            >
              Restore
            </button>
          </NoteCard>
        ))}
      {dragPosition && draggedColor && (
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
