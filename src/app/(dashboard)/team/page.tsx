import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, Mail, Phone, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { getTeamMembers, deleteTeamMember } from '../../actions';

export default async function Page() {
  const teamMembers = await getTeamMembers();
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Team Members</h1>
          <p className="text-sm text-slate-500">Manage your company's personnel and staff directory.</p>
        </div>
        <Link href="/team/new" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Add Member
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between bg-slate-50/50">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search team members..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 bg-white rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-slate-50/30">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center relative group">
              <span className={`absolute top-3 right-3 w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
              <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold mb-3">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-base font-semibold text-slate-900">{member.name}</h3>
              <p className="text-sm text-indigo-600 font-medium mb-1">{member.role}</p>
              <p className="text-xs text-slate-500 mb-4 h-8 overflow-hidden text-ellipsis">{member.bio || "No bio available."}</p>
              
              <div className="w-full pt-4 border-t border-slate-100 flex justify-center gap-4">
                <Link href={`/team/${member.id}`} className="text-slate-400 hover:text-indigo-600 transition-colors p-1" title="Edit">
                  <Edit className="w-4 h-4" />
                </Link>
                <form action={async () => { "use server"; await deleteTeamMember(member.id); }}>
                  <button type="submit" className="text-slate-400 hover:text-red-600 transition-colors p-1" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}