"use client";

import { Bell, Search, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-center bg-slate-100 rounded-md px-3 py-2 w-96">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search projects, leads, or settings..."
          className="bg-transparent border-none outline-none ml-2 text-sm w-full text-slate-700"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 relative rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-slate-700">{session?.user?.name || "Admin"}</span>
            <span className="text-xs text-slate-500">{session?.user?.email || "admin@example.com"}</span>
          </div>
          <div className="h-8 w-8 rounded-md bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-sm flex items-center justify-center text-white font-bold text-sm">
            {session?.user?.name?.charAt(0) || "A"}
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="p-1.5 ml-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Sign out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
