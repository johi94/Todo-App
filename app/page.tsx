import { lato } from "./fonts";
import NoteStack from "./components/NoteStack";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center bg-background font-sans">
      <h1
        className={`${lato.className} text-3xl font-semibold text-foreground`}
      >
        My ToDos:
      </h1>
      <div className="absolute bottom-8 right-32">
        <NoteStack />
      </div>
    </main>
  );
}
