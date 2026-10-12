import { createService } from "../../../actions";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewServicePage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;

    if (!name || !description || !status) return;

    await createService({ name, description, status });
    redirect("/services");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/services" className="p-2 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
          <ArrowLeft size={18} className="text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add New Service</h1>
          <p className="text-slate-500 mt-1">Create a new core service offering.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Service Name *</label>
            <input name="name" required type="text" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="e.g. Architectural Design" />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Description *</label>
            <textarea name="description" required rows={4} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="Brief service description..." />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Status *</label>
            <select name="status" required className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white">
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Link href="/services" className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              Cancel
            </Link>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
              Save Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
