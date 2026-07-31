import { lato } from "./fonts";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-background font-sans">
      <h1 className={`${lato.className} text-3xl font-semibold text-foreground`}>
        My ToDos:
      </h1>
    </main>
  );
}
