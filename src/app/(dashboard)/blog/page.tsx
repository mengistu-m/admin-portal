import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit, FileText, BarChart2 } from 'lucide-react';

const blogPosts = [
  { id: 1, title: '10 Innovations in Sustainable Construction for 2024', author: 'Elena Rodriguez', category: 'Sustainability', status: 'Published', views: 1240, date: 'Oct 15, 2023' },
  { id: 2, title: 'Understanding the New Zoning Laws in Downtown', author: 'James Wilson', category: 'Legal & Compliance', status: 'Draft', views: 0, date: 'Oct 12, 2023' },
  { id: 3, title: 'Why Safety Gear Matters More Than Ever', author: 'Marcus Johnson', category: 'Safety', status: 'Published', views: 856, date: 'Sep 30, 2023' },
  { id: 4, title: 'Choosing the Right Heavy Machinery for Your Project', author: 'Sophia Lee', category: 'Equipment', status: 'Archived', views: 3210, date: 'Aug 14, 2023' },
];

export default function Page() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
          <p className="text-sm text-slate-500">Create, edit, and manage company news and articles.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      <div className="flex gap-6 border-b border-slate-200">
        <button className="pb-3 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600">All Posts</button>
        <button className="pb-3 text-sm font-medium text-slate-500 hover:text-slate-700">Published</button>
        <button className="pb-3 text-sm font-medium text-slate-500 hover:text-slate-700">Drafts</button>
        <button className="pb-3 text-sm font-medium text-slate-500 hover:text-slate-700">Archived</button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between bg-slate-50/50">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search articles..." 
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
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Author</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Views</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {blogPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 max-w-xs truncate" title={post.title}>
                    {post.title}
                  </td>
                  <td className="px-6 py-4">{post.author}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-medium">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 
                      post.status === 'Draft' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <BarChart2 className="w-4 h-4" />
                      <span>{post.views.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{post.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 text-slate-400">
                      <button className="hover:text-indigo-600 p-1" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="hover:text-slate-600 p-1" title="More">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
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