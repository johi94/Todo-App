"use client";

import { useRef } from "react";

type NoteStackProps = {
  colors: string[];
};

export default function NoteStack({ colors }: NoteStackProps) {
  const topNoteRef = useRef<HTMLDivElement>(null);

  function handleDragStart(event: React.DragEvent) {
    event.dataTransfer.setData("text/plain", "note");
    if (topNoteRef.current) {
      event.dataTransfer.setDragImage(topNoteRef.current, 72, 72);
    }
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="relative h-40 w-40 cursor-grab"
    >
      <div
        suppressHydrationWarning
        className={`absolute h-36 w-36 rotate-6 rounded-md ${colors[2]}`}
      />
      <div
        suppressHydrationWarning
        className={`absolute h-36 w-36 -rotate-3 rounded-md ${colors[1]}`}
      />
      <div
        ref={topNoteRef}
        suppressHydrationWarning
        className={`absolute h-36 w-36 rotate-2 rounded-md ${colors[0]}`}
      />
    </div>
  );
}





