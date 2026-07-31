export const noteColors = [
  "bg-yellow-200",
  "bg-pink-200",
  "bg-green-200",
  "bg-sky-200",
  "bg-orange-200",
  "bg-purple-200",
  "bg-teal-200",
  "bg-rose-200",
  "bg-amber-200",
];

export const defaultNoteColor = "bg-sky-200";

export function getRandomNoteColor() {
  const index = Math.floor(Math.random() * noteColors.length);
  return noteColors[index];
}

