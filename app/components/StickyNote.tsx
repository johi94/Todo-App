"use client";

import { useState } from "react";
import { NOTE_SIZE } from "./noteSize";

type StickyNoteProps = {
  id: string;
  color: string;
  x: number;
  y: number;
  text: string;
  onGrab: (event: React.PointerEvent, id: string) => void;
  onSave: (id: string, text: string) => void;
  onClear: (id: string) => void;
};

const buttonClassName =
  "cursor-pointer rounded bg-slate-900/70 px-2 py-1 text-xs text-white transition-colors hover:bg-slate-900/90";

export default function StickyNote({
  id,
  color,
  x,
  y,
  text,
  onGrab,
  onSave,
  onClear,
}: StickyNoteProps) {
  const [draft, setDraft] = useState(text);

  function handleSave() {
    onSave(id, draft);
  }

  function handleClear() {
    setDraft("");
    onClear(id);
  }

  return (
    <div
      className={`absolute flex flex-col gap-1 rounded-md p-2 ${color} shadow-md`}
      style={{ left: x, top: y, height: NOTE_SIZE, width: NOTE_SIZE }}
    >
      <div
        onPointerDown={(event) => onGrab(event, id)}
        className="h-4 w-full shrink-0 cursor-grab touch-none select-none rounded bg-black/10"
        aria-label="Drag note"
      />
      <textarea
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Write a note..."
        aria-label="Note text"
        className="flex-1 resize-none bg-transparent text-sm text-slate-900 outline-none"
      />
      <div className="flex justify-between gap-1">
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear note text"
          className={buttonClassName}
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleSave}
          aria-label="Save note text"
          className={buttonClassName}
        >
          Save
        </button>
      </div>
    </div>
  );
}
