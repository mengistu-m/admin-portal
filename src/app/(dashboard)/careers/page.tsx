import { Briefcase, Plus, Users, MapPin, Search, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

import { getJobs, deleteJob } from "../../actions";

export default async function CareersPage() {
  const jobs = await getJobs();
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Careers Manager</h1>
          <p className="text-slate-500 mt-1">Manage job postings and applicant tracking.</p>
        </div>
        <Link href="/careers/new" className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm">
          <Plus size={18} />
          Post New Job
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search jobs..." 
              className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64 bg-white"
            />
          </div>
        </div>
        
        <div className="divide-y divide-slate-200">
          {jobs.map((job) => (
            <div key={job.id} className="p-6 hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    job.status === 'Open' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5"><Briefcase size={14}/> {job.department}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={14}/> {job.location}</span>
                  <span className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 rounded text-slate-600">{job.type}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-1">
                    <Users size={18} className="text-indigo-500"/> 0
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Applicants</div>
                </div>
                
                <div className="flex items-center gap-2 border-l border-slate-200 pl-6">
                  <button className="px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded hover:bg-indigo-100 transition-colors">
                    View Applicants
                  </button>
                  <Link href={`/careers/${job.id}`} className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors" title="Edit">
                    <Edit size={16} />
                  </Link>
                  <form action={async () => { "use server"; await deleteJob(job.id); }}>
                    <button type="submit" className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}