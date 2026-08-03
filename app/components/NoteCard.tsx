"use client";

import { NOTE_SIZE } from "./noteSize";

type NoteCardProps = {
  color: string;
  text: string;
  editable?: boolean;
  onGrab: (event: React.PointerEvent) => void;
  onTextChange?: (text: string) => void;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export default function NoteCard({
  color,
  text,
  editable = false,
  onGrab,
  onTextChange,
  className = "",
  style,
  children,
}: NoteCardProps) {
  return (
    <div
      className={`group flex flex-col gap-1 rounded-md p-2 ${color} shadow-md transition-all duration-150 hover:scale-[1.02] hover:shadow-lg ${className}`}
      style={{ height: NOTE_SIZE, width: NOTE_SIZE, ...style }}
    >
      <div
        onPointerDown={onGrab}
        className="h-4 w-full shrink-0 cursor-grab touch-none select-none rounded bg-black/10 transition-colors duration-150 group-hover:bg-black/25"
        aria-label="Drag note"
      />
      {editable ? (
        <textarea
          value={text}
          onChange={(event) => onTextChange?.(event.target.value)}
          placeholder="Write a note..."
          aria-label="Note text"
          className="flex-1 resize-none bg-transparent text-sm text-slate-900 outline-none"
        />
      ) : (
        <p className="flex-1 overflow-hidden text-sm text-slate-900">
          {text || "Empty note"}
        </p>
      )}
      <div
        onPointerDown={(event) => event.stopPropagation()}
        className="flex justify-between gap-1"
      >
        {children}
      </div>
    </div>
  );
}
