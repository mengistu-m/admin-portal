import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Star } from 'lucide-react';
import Link from 'next/link';
import { getTestimonials, deleteTestimonial } from '../../actions';

export default async function Page() {
  const testimonials = await getTestimonials();
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
          <p className="text-sm text-slate-500">Manage client reviews and feedback.</p>
        </div>
        <Link href="/testimonials/new" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Add Testimonial
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between bg-slate-50/50">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search testimonials..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 bg-white rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Company/Role</th>
                <th className="px-6 py-3">Rating</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {testimonials.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.clientName}</td>
                  <td className="px-6 py-4">
                    <div className="text-slate-900">{item.company || "N/A"}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < item.rating ? 'fill-current' : 'text-slate-200'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Link href={`/testimonials/${item.id}`} className="text-slate-400 hover:text-indigo-600 p-1">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={async () => { "use server"; await deleteTestimonial(item.id); }}>
                        <button type="submit" className="text-slate-400 hover:text-red-600 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
          <div>Showing 1 to 3 of 3 results</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-slate-300 rounded bg-indigo-50 text-indigo-600 font-medium">1</button>
            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}