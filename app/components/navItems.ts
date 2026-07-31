import type { ComponentType } from "react";
import { LayoutDashboard, Trash2, Archive } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Trash", href: "#", icon: Trash2 },
  { label: "Archive", href: "#", icon: Archive },
];
