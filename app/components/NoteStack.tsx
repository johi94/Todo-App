"use client";

import { NOTE_SIZE } from "./noteSize";

type NoteStackProps = {
  colors: string[];
  isDragging: boolean;
  onGrab: (event: React.PointerEvent) => void;
};

export default function NoteStack({
  colors,
  isDragging,
  onGrab,
}: NoteStackProps) {
  return (
    <div
      onPointerDown={onGrab}
      style={{ height: NOTE_SIZE, width: NOTE_SIZE }}
      className={`relative cursor-grab touch-none select-none transition-transform duration-200 ${
        isDragging ? "scale-95 opacity-70" : ""
      }`}
    >
      <div
        suppressHydrationWarning
        style={{ height: NOTE_SIZE, width: NOTE_SIZE }}
        className={`absolute rotate-6 rounded-md ${colors[2]}`}
      />
      <div
        suppressHydrationWarning
        style={{ height: NOTE_SIZE, width: NOTE_SIZE }}
        className={`absolute -rotate-3 rounded-md ${colors[1]}`}
      />
      <div
        suppressHydrationWarning
        style={{ height: NOTE_SIZE, width: NOTE_SIZE }}
        className={`absolute rotate-2 rounded-md ${colors[0]}`}
      />
    </div>
  );
}
