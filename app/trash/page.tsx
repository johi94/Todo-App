import { lato } from "../fonts";

export default function TrashPage() {
  return (
    <main className="flex flex-1 flex-col items-center bg-background font-sans">
      <h1 className={`${lato.className} text-3xl font-semibold text-foreground`}>
        Trash
      </h1>
    </main>
  );
}
