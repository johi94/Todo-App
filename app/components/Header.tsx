import { Cantarell } from "next/font/google";
import MobileMenu from "./MobileMenu";

const cantarell = Cantarell({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 pt-8 pb-4 bg-slate-950">
      <h1
        className={`${cantarell.className} text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground hover:text-amber-400 transition-colors duration-200 cursor-pointer`}
      >
        StickyDo
      </h1>
      <MobileMenu />
    </header>
  );
}

