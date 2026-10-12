import { Mail, Search, Filter, Phone, Calendar, CheckCircle, Clock, MoreVertical, Paperclip, Trash2 } from "lucide-react";

import { getLeads, deleteLead } from "../../actions";

export default async function LeadsPage() {
  const leads = await getLeads();
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads & Inquiries</h1>
          <p className="text-slate-500 mt-1">Manage contact form submissions and quote requests.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium">Total Leads</p>
            <h3 className="text-xl font-bold text-slate-900 mt-1">128</h3>
          </div>
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Mail size={20} /></div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium">New (Unread)</p>
            <h3 className="text-xl font-bold text-slate-900 mt-1">12</h3>
          </div>
          <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><Clock size={20} /></div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium">In Progress</p>
            <h3 className="text-xl font-bold text-slate-900 mt-1">45</h3>
          </div>
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Calendar size={20} /></div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium">Converted (Won)</p>
            <h3 className="text-xl font-bold text-slate-900 mt-1">71</h3>
          </div>
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><CheckCircle size={20} /></div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by name, email, or company..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white">
              <option>All Services</option>
              <option>Architectural Design</option>
              <option>Civil Works</option>
            </select>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-md bg-white text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-sm">
                <th className="px-6 py-3 font-medium">Contact Details</th>
                <th className="px-6 py-3 font-medium">Interest / Service</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date Received</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{lead.name} <span className="text-slate-400 font-normal ml-1">({lead.company})</span></div>
                    <div className="text-slate-500 text-xs mt-1 flex flex-col gap-0.5">
                      <span className="flex items-center gap-1"><Mail size={12}/> {lead.email}</span>
                      <span className="flex items-center gap-1"><Phone size={12}/> {lead.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                      {lead.service}
                    </span>
                    <div className="mt-2 text-xs text-indigo-600 flex items-center gap-1">
                      <Paperclip size={12} /> 1 attachment
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      lead.status === 'New' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      lead.status === 'Won' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      lead.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <form action={async () => { "use server"; await deleteLead(lead.id); }}>
                      <button type="submit" className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}