"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "./navItems";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative sm:hidden">
      <button onClick={() => setIsOpen(!isOpen)} aria-label="Menü öffnen" className="text-foreground">
        {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 flex flex-col gap-4 rounded-md bg-slate-800 px-4 py-4 text-lg">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="flex items-center gap-2">
              <item.icon className="w-[1em] h-[1em]" />
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
