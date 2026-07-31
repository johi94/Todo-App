export default function NoteStack() {
  return (
    <div className="relative h-24 w-24">
      <div className="absolute h-20 w-20 rotate-6 rounded-md bg-pink-200" />
      <div className="absolute h-20 w-20 -rotate-3 rounded-md bg-yellow-200" />
      <div className="absolute h-20 w-20 rotate-2 rounded-md bg-sky-200" />
    </div>
  );
}
