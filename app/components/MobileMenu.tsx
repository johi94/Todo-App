"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "./navItems";
import { useCloseOnOutsideOrEscape } from "../hooks/useCloseOnOutsideOrEscape";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useCloseOnOutsideOrEscape(menuRef, () => setIsOpen(false));

  return (
    <div ref={menuRef} className="relative sm:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open menu"
        className="text-foreground hover:text-sky-300 transition-colors duration-200 cursor-pointer"
      >
        <Menu className="w-7 h-7" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 flex flex-col items-start gap-4 rounded-md bg-slate-800 px-4 pt-10 pb-4 text-lg min-w-45">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="absolute top-2 right-2 text-foreground hover:text-sky-300 transition-colors duration-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 hover:text-sky-300 transition-colors duration-200"
            >
              <item.icon className="w-[1em] h-[1em]" />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
