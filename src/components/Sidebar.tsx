"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Home,
  Briefcase,
  FolderOpen,
  MessageSquare,
  Users,
  FileText,
  GraduationCap,
  Mail,
  Settings,
  Menu,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Home Page Builder", href: "/home-builder", icon: Home },
  { name: "Services", href: "/services", icon: Briefcase },
  { name: "Portfolio", href: "/portfolio", icon: FolderOpen },
  { name: "Testimonials", href: "/testimonials", icon: MessageSquare },
  { name: "Team", href: "/team", icon: Users },
  { name: "Blog", href: "/blog", icon: FileText },
  { name: "Careers", href: "/careers", icon: GraduationCap },
  { name: "Leads & Inquiries", href: "/leads", icon: Mail },
  { name: "Site Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col bg-white border-r h-screen transition-all duration-300 z-10",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b">
        {!collapsed && (
          <span className="text-xl font-bold text-slate-800">Admin Portal</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-slate-100 text-slate-500"
        >
          <Menu size={20} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-md transition-colors",
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon size={20} className={cn("shrink-0", isActive ? "text-indigo-600" : "text-slate-400")} />
              {!collapsed && (
                <span className="ml-3 font-medium text-sm">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
            A
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-slate-700">Admin User</p>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
