import { getProject, updateProject } from "../../../actions";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const project = await getProject(parseInt((await params).id));
  
  if (!project) {
    notFound();
  }

  async function handleSubmit(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const clientName = formData.get("clientName") as string;
    const category = formData.get("category") as string;
    const status = formData.get("status") as string;
    const date = formData.get("date") as string;
    const description = formData.get("description") as string;

    if (!title || !category || !status || !date) return;

    await updateProject(parseInt((await params).id), { title, clientName, category, status, date, description });
    redirect("/portfolio");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/portfolio" className="p-2 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
          <ArrowLeft size={18} className="text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Project</h1>
          <p className="text-slate-500 mt-1">Update the project entry in your portfolio.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Project Title *</label>
            <input name="title" defaultValue={project.title} required type="text" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="e.g. Downtown Commercial Tower" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Client Name</label>
              <input name="clientName" defaultValue={project.clientName || ""} type="text" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="e.g. Acme Corp" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Category *</label>
              <select name="category" defaultValue={project.category} required className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white">
                <option value="Architectural Design">Architectural Design</option>
                <option value="Civil Works">Civil Works</option>
                <option value="Electrical">Electrical</option>
                <option value="Sanitation">Sanitation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Status *</label>
              <select name="status" defaultValue={project.status} required className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white">
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Planned">Planned</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Completion Date *</label>
              <input name="date" defaultValue={project.date} required type="text" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="e.g. Oct 2026" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea name="description" defaultValue={project.description || ""} rows={4} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="Brief project description..." />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Link href="/portfolio" className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              Cancel
            </Link>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
