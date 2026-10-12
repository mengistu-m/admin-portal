import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

import { getProjects, deleteProject } from "../../actions";

export default async function PortfolioPage() {
  const projects = await getProjects();
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Portfolio Manager</h1>
          <p className="text-slate-500 mt-1">Manage your construction and consultancy projects.</p>
        </div>
        <Link href="/portfolio/new" className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm">
          <Plus size={18} />
          Add Project
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64 bg-white"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-md bg-white text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter size={16} />
              Filter
            </button>
          </div>
          <div className="text-sm text-slate-500">
            Showing {projects.length} projects
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-sm">
                <th className="px-6 py-3 font-medium">Project Name</th>
                <th className="px-6 py-3 font-medium">Client</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{project.title}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{project.clientName}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Completed' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{project.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/portfolio/${project.id}`} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors" title="Edit">
                        <Edit size={16} />
                      </Link>
                      <form action={async () => { "use server"; await deleteProject(project.id); }}>
                        <button type="submit" className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </form>
                      <button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
          <button className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>
            Previous
          </button>
          <div className="text-sm text-slate-600">Page 1 of 1</div>
          <button className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}