import { getJob, updateJob } from "../../../actions";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const job = await getJob(parseInt((await params).id));

  if (!job) {
    notFound();
  }

  async function handleSubmit(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const department = formData.get("department") as string;
    const location = formData.get("location") as string;
    const type = formData.get("type") as string;
    const status = formData.get("status") as string;

    if (!title || !department || !location || !type) return;

    await updateJob(parseInt((await params).id), { title, department, location, type, status });
    redirect("/careers");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/careers" className="p-2 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
          <ArrowLeft size={18} className="text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Job Posting</h1>
          <p className="text-slate-500 mt-1">Update the job posting details.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Job Title *</label>
            <input name="title" defaultValue={job.title} required type="text" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="e.g. Senior Structural Engineer" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Department *</label>
              <input name="department" defaultValue={job.department} required type="text" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="e.g. Engineering" />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Location *</label>
              <input name="location" defaultValue={job.location} required type="text" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="e.g. New York, NY" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Employment Type *</label>
              <select name="type" defaultValue={job.type} required className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white">
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Status *</label>
              <select name="status" defaultValue={job.status} required className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white">
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Link href="/careers" className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
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
