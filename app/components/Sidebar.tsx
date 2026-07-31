"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./navItems";
import { lato } from "../fonts";

export default function Sidebar() {
  const iconClass = "w-[1em] h-[1em]";
  const pathname = usePathname();

  return (
    <aside
      className={`${lato.className} hidden sm:flex sm:w-64 md:w-80 flex-col items-start gap-6 bg-slate-800 pt-15 pb-4 text-xl sm:text-2xl md:text-4xl`}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex w-full items-center gap-2 px-8 py-1 transition-colors duration-200 ${
              isActive ? "bg-slate-900 text-sky-300" : "hover:text-sky-300"
            }`}
          >
            <item.icon className={iconClass} />
            {item.label}
          </Link>
        );
      })}
    </aside>
  );
}
