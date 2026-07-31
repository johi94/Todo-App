import Link from "next/link";
import { navItems } from "./navItems";
import { lato } from "../fonts";


export default function Sidebar() {
  const iconClass = "w-[1em] h-[1em]";

  return (
    <aside
  className={`${lato.className} hidden sm:flex sm:w-64 md:w-80 flex-col items-start bg-slate-800 px-8 pt-15 pb-4 text-xl sm:text-2xl md:text-4xl`}
>
      <div className="flex flex-col items-start gap-6">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} className="flex items-center gap-2 hover:text-sky-300 transition-colors duration-200">
            <item.icon className={iconClass} />
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}

