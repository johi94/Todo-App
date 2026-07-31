import Link from "next/link";
import { cantarell } from "../fonts";
import MobileMenu from "./MobileMenu";


export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 pt-8 pb-4 bg-slate-950">
      <Link href="/">
        <h1
          className={`${cantarell.className} text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground hover:text-sky-300 transition-colors duration-200 cursor-pointer`}
        >
          StickyDo
        </h1>
      </Link>
      <MobileMenu />
    </header>
  );
}

