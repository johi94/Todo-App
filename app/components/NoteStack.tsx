"use client";

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
      className={`relative h-40 w-40 cursor-grab touch-none select-none transition-transform duration-200 ${
        isDragging ? "scale-95 opacity-70" : ""
      }`}
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
        suppressHydrationWarning
        className={`absolute h-36 w-36 rotate-2 rounded-md ${colors[0]}`}
      />
    </div>
  );
}
